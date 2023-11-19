import React, { useState } from 'react';
import axios from 'axios';
import './ComicForm.css'; 
import html2canvas from 'html2canvas';

function ComicForm() {
    const initialPanelSize = 10;
    const [panelSize, setPanelSize] = useState(initialPanelSize);
    const [username, setUsername] = useState('');
    const [panels, setPanels] = useState(Array(panelSize).fill(''));
    const [generatedImages, setGeneratedImages] = useState([]);
    const [comicName, setComicName] = useState('');
    const [wantedPanels, setWantedPanels] = useState(initialPanelSize);

    const updatePanelSize = (newSize) => {
        setPanelSize(newSize);
        setPanels(Array(newSize).fill(''));
    };

    const generateComic = async () => {
        try {
            const response = await fetch('http://localhost:5000/generate-comic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, panels }),
            });

            const data = await response.json();

            if (data.success) {
                setGeneratedImages(data.images);
            } else {
                console.error('Error: No image data received');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const saveComic = async () => {
        // const formData = new FormData();
        // formData.append('username', username);
        // formData.append('panels', panels);
        // formData.append('images', generatedImages);
        // console.log(formData);
        try {
            //   const response1 = await fetch('http://localhost:5000/save-comic-post', {
            //     method: 'POST',
            //     headers: {
            //     //   'Content-Type': 'application/json',
            //         'Content-Type': 'multipart/form-data',
            //     },
            //     body: formData,
            // JSON.stringify({ username, panels, generatedImages }),
            // const dummyBase64Strings = Array.from({ length: 10 }, generateDummyBase64String);
            // console.log(dummyBase64Strings);
            const formData = new FormData();
            formData.append('username', username);
            formData.append('panels', JSON.stringify(panels));
            formData.append('comic_name', comicName);
            generatedImages.forEach((base64String, index) => {
              formData.append(`image_${index + 1}`, base64String);
            });
            const response1 = await axios.post('http://localhost:5000/save-comic-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(generatedImages);
            console.log(response1.data);
            const data1 = await response1.data;

            if (data1.success) {
                console.log('Comic post data saved successfully');
            } else {
                console.error('Error:', data1.error);
            }
        } catch (error) {
            console.log(1)
            console.error('Error:', error);
        }
    };

    return (
        <div className="comic-form-container">
            <h1>Comic Generator</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {/* New input field for the comic name */}
                <label htmlFor="comicName">Comic Name:</label>
                <input
                    type="text"
                    id="comicName"
                    value={comicName}
                    onChange={(e) => setComicName(e.target.value)}
                />
                <label htmlFor="wantedPanels">Required Panel size:</label>
                <input
                    type="number"
                    id="wantedPanels"
                    value={wantedPanels}
                    onChange={(e) => setWantedPanels(e.target.value)}
                />
                <button type="button" onClick={() => updatePanelSize(parseInt(wantedPanels))}>
                    Change Panel Size
                </button>


                {panels.map((panel, index) => (
                    <div key={index} className="panel-container">
                        <label htmlFor={`panel${index + 1}`}>{`Panel ${index + 1}:`}</label>
                        <textarea
                            id={`panel${index + 1}`}
                            value={panel}
                            onChange={(e) => {
                                const newPanels = [...panels];
                                newPanels[index] = e.target.value;
                                setPanels(newPanels);
                            }}
                        ></textarea>
                    </div>
                ))}

                <button type="button" onClick={generateComic}>
                    Generate Comic
                </button>

                <button type="button" onClick={saveComic}>
                    Save Comic
                </button>
            </form>

            {generatedImages.length > 0 && (
                <div className="generated-images-container">
                    <h2>Generated Images</h2>
                    {generatedImages.map((base64String, index) => (
                        <img
                            key={index}
                            src={`data:image/png;base64,${base64String}`}
                            alt={`Generated Image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ComicForm;

