import {  useState, useEffect } from "react";
import { projectFirestore } from "./FirebaseConfig";

export default function UseFirestore (collection){

    const[ docs, setDocs] = useState([]);
    const [count, setcount] = useState(0);


    useEffect (() => {
        const unsub = projectFirestore.collection(collection)
        .orderBy('createdAt' , 'asc')
        .onSnapshot((snap) => {
            let doccuments = [];
            snap.forEach(doc => {
                doccuments.push({...doc.data(), id: doc.id})
                
            });
            setDocs(doccuments);
            setcount( Object.keys(doccuments).length)
        });

        return () => unsub();
    }, [collection])
    
    return { docs , count };
}

