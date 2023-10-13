import React from "react";

export default function Form() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemeImages, setAllMemeImages] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((resolve) => resolve.json())
      .then((datas) => setAllMemeImages(datas.data.memes));
  }, []);

  //datas.data.memes is an array.Since we initialized allMemeImages as [], it is also an array.That's why we can directly
  //write allMemeImages.length
  console.log(allMemeImages);

  function getMemeImage() {
    var x = Math.floor(Math.random() * allMemeImages.length);
    var randomMeme = allMemeImages[x].url;
    setMeme((memeproperties) => {
      return {
        ...memeproperties,
        randomImage: randomMeme,
      };
    });
    return meme.randomImage;
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setMeme((prevForms) => {
      return {
        ...prevForms,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className="form-container">
      <div className="inputs">
        <input
          type="text"
          id="text1"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          placeholder="Enter your first sentence."
        />
        <input
          type="text"
          id="text2"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          placeholder="Enter your second sentence."
        />
      </div>
      <button className="btn" type="button" onClick={getMemeImage}>
        Get a new meme image
      </button>

      <div className="memestext">
        {meme.randomImage && (
          <img src={meme.randomImage} alt="meme-Image" className="meme-Image" />
        )}
        <h2 className="memestext--text top">{meme.topText}</h2>
        <h2 className="memestext--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
