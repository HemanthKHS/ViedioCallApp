import { React ,useState,useEffect } from "react";
import  {projectStorage , projectFirestore , timestamp}  from './FirebaseConfig';


    
 function useStorage (file){
        const [progress, setprogress] = useState(0);
     const [error, seterror] = useState(null)
     const [url, seturl] = useState(null)

     useEffect( () =>{
        // refrerences
        const storageRef = projectStorage.ref(file.name)
        const collectionRef = projectFirestore.collection('image');

        storageRef.put(file).on('state_changed,()' , (snap) => {
            let percentage = (snap.bytesTransferred / snap.tatalBytes)*100;
            setprogress(percentage)
        }, (err)=> {
            seterror(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            collectionRef.add({ url , createdAt})
            seturl(url)
        })

     },[file])

       

        return(
            {progress, url , error}
        )
    }
    export default  useStorage;

    