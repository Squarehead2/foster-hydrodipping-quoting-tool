import { storage } from '../_utils/firebase';
import { useEffect, useState } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';

export default function NewestDesigns() {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch image from the same location as InStockDesigns
                const newestDesignRef = ref(storage, 'patterns/type1/'); // Update the path as needed
                const url = await getDownloadURL(newestDesignRef);
                setImageUrl(url);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                {imageUrl && <img src={imageUrl} alt="Shoes" className="rounded-xl" />}
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
}

