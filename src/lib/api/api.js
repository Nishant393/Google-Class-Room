import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider } from "../firebase/firebaseConfig";
import { arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ID } from "appwrite";
import { Avatars, Client } from 'appwrite';

export const googleSignIn = async () => {
    try {
        let user
        await signInWithPopup(auth, provider)
            .then(async (result) => {
                user = result.user
                console.log(user)
                await saveToDb(result.user)
            }).catch((error) => {
                console.log(error)
                return error
            });
        return user;
    } catch (error) {
        console.log(error)
        return (error)
    }
}

export const saveToDb = async (result) => {
    try {
        console.log(result)
        const userCollection = collection(db, "users")
        const q = query(userCollection, where("email", "==", result.email))
        const queryData = await getDocs(q)
        const userData = []
        queryData.forEach((doc) => {
            userData.push(doc.data());
        });

        if (userData.length == 1) {

        } else {
            await setDoc(doc(db, "users", result.uid), {
                name: result.displayName,
                email: result.email,
                imageURL: result.photoURL,
                phoneNumber: result.phoneNumber,
            });
        }
    } catch (error) {
        return error
    }
}

export const signOutFn = async () => {
    try {
        await signOut(auth).then(() => {
            localStorage.removeItem("GoogleClass")
        }).catch((error) => {
            return error
        });
        return ("sign Out Sucsessfull !")
    } catch (error) {
        return (error)
    }

}

export const getUserById = async (id) => {
    try {
        const userRef = doc(db, "users", id)
        const data = await getDoc(userRef)
        return data.data()
    } catch (error) {
        return (error)
    }
}

export const createClass = async (room) => {
    const avatarUrl = new Avatars(new Client()).getInitials(room.className).toString()
    try {
        const id = ID.unique()
        await setDoc(doc(db, "rooms", id), { 
            classCode: id,
            className: room.className,
            subject: room.subject,
            room: room.roomNumber,
            teacher: room.teacher,
            imageURL: avatarUrl,
            material: [],
        })
        return (id)
    } catch (error) {
        return (error)
    }

}

export const getClassById = async (id) => {
    try {
        const classRef = doc(db, "rooms", id)
        const classDoc = await getDoc(classRef)
        const classData = classDoc.data()
        return classData
    } catch (error) {
        return error
    }
}

export const getAllClasses = async () => {
    try {
        const classRef = collection(db, "rooms")
        const classDoc = await getDocs(classRef)
        const classs = [];
        await classDoc.forEach((doc) => {
            classs.push(doc.id);
        });

        if (!classs) throw Error
        return classs
    } catch (error) {
        return error
    }
}

export const joinClassById = async (id, fieldValue) => {
    try {
        const classRef = doc(db, "rooms", id)
        const classDoc = await getDoc(classRef)
        const classData = classDoc.data()
        const classStd = await classData?.student
        const classTeacher = await classData?.teacher.uid
        const room = [...classStd || []]
        const isAlreadyJoin = room.includes(fieldValue)
        let allOk = false
        room.push(fieldValue)
        if (classTeacher === fieldValue && isAlreadyJoin) {
            allOk = false
        } else {
            allOk = true
            await updateDoc(classRef, {
                "student": room
            })
        }

        return allOk
    } catch (error) {
        return error
    }
}

export const deleteClass = async (id, uid) => {

    function removeElement(classes, elementToRemove) {

        const index = classes.indexOf(elementToRemove);
        if (classes.length == 1) {
            classes.pop()
            return classes
        }
        else if (index !== -1) {
            classes.splice(index, 1);
            return classes;
        }
        return classes;
    }

    const recurcive = async (stuID) => {

        const stuRef = doc(db, "users", stuID);
        const userData = await getUserById(stuID)
        const roomArr = userData?.class || []
        const updatedRoomArr = removeElement(roomArr, id)

        await updateDoc(stuRef, {
            "class": updatedRoomArr
        })
    }

    try {
        const classRef = doc(db, "rooms", id);

        const classData = await getClassById(id)
        const studentArr = classData?.student
        const userRef = doc(db, "users", uid);
        const userData = await getUserById(uid)
        const roomArr = userData?.class || []

        const updatedRoomArr = removeElement(roomArr, id)

        // remove class from teacher
        await updateDoc(userRef, {
            "class": updatedRoomArr
        })

        // remove class from students 
        if(studentArr==undefined){

        }else{
            studentArr.forEach(recurcive)
        }
        // delete calss
        await deleteDoc(classRef)

        return true
    } catch (error) {
        return false
    }
}

export const unenrolClass = async (id, uid) => {

    function removeElement(classes, elementToRemove) {

        const index = classes.indexOf(elementToRemove);
        if (classes.length == 1) {
            classes.pop()
            return classes
        }
        else if (index !== -1) {
            classes.splice(index, 1);
            return classes;
        }
        return classes;
    }

    try {
        const classRef = doc(db, "rooms", id);
        const classData = getClassById(id)
        const userRef = doc(db, "users", uid);
        const userData = await getUserById(uid)

        const roomArr = userData?.class || []
        const studentArr = classData?.student || []

        const updatedRoomArr = removeElement(roomArr, id)
        const updatedStudentArr = removeElement(studentArr, id)

        await updateDoc(classRef, {
            "student": updatedStudentArr
        })

        await updateDoc(userRef, {
            "class": updatedRoomArr
        })
        // await deleteDoc(classRef)

        return true
    } catch (error) {
        return false
    }
}

export const saveClassToUser = async (id, e) => {
    try {
        const userRef = doc(db, "users", id)
        const userDoc = await getDoc(userRef)
        const userData = userDoc.data()
        const userClass = await userData?.class
        const room = [...userClass || ""]

        if (room.includes(e)) {
        } else {
            room.push(e)
            await updateDoc(userRef, {
                class: room
            })
            return id
        }
        return id
    } catch (error) {
        return error
    }
}

export const checkIsTeacherLogin = async (id, attach, materials) => {
    try {

        const classRef = doc(db, "rooms", id)
        const classDoc = await getDoc(classRef)
        const classData = classDoc.data()

        const data = {
            postedBy: materials.postedBy,
            title: materials.title || "",
            description: materials.description || "",
            links: attach.links || "",
            // files: attach.file || "" ,
            URLs: attach.URLs || "",
        }

        await updateDoc(classRef, {
            material: arrayUnion(data)
        });



        return classData
    } catch (error) {
        return error
    }
}

export const saveMaterialToRoom = async (id, attach, materials) => {
    try {

        const classRef = doc(db, "rooms", id)
        const classDoc = await getDoc(classRef)
        const classData = classDoc.data()

        const data = {
            postedBy: materials.postedBy,
            title: materials.title || "",
            description: materials.description || "",
            links: attach.links || "",
            // files: attach.file || "" ,
            URLs: attach.URLs || "",
        }

        await updateDoc(classRef, {
            material: arrayUnion(data)
        });



        return classData
    } catch (error) {
        return error
    }
}


