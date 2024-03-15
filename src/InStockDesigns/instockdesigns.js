import React, { useState, useEffect } from 'react';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../_utils/firebase';

export default function NewestDesigns() {
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // List and fetch images from 'patterns/type1/' location
            const patternsRef = ref(storage, 'patterns/type1/');
            const patternsSnapshot = await listAll(patternsRef);
            const patternsUrls = await Promise.all(patternsSnapshot.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
            }));

            // List and fetch images from 'patterns/type2/' location
            const type2Ref = ref(storage, 'patterns/type2/');
            const type2Snapshot = await listAll(type2Ref);
            const type2Urls = await Promise.all(type2Snapshot.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
            }));

            // Concatenate both lists of image URLs
            setImageList([...patternsUrls, ...type2Urls]);
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>Newest Designs coming soon!</p>
            {imageList.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} />
            ))}
        </div>
    );
}
