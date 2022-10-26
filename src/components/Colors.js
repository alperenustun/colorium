import React from 'react'
import Favorites from './Favorites';

export default function Colors() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [colorsData, setColorsData] = React.useState({
    count: 4,
    mode: 'monochrome',
    value: '12B298'
  })

  const url = `https://www.thecolorapi.com/scheme?hex=${colorsData.value}&mode=${colorsData.mode}&count=${colorsData.count}`
  React.useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  function addColorCount(event) {
    setColorsData(prevColors => ({
      ...prevColors,
      count: prevColors.count + 1
    }))
    console.log(data);
  }
  function removeColorCount() {
    setColorsData(prevColors => ({
      ...prevColors,
      count: prevColors.count === 4 ? 4 : prevColors.count - 1
    }))
  }

  const [favoritesShown, setfavoritesShown] = React.useState(false);
  function displayFavorites() {
    setfavoritesShown(prevShown => !prevShown);
  }


  const [savedColors, setSavedColors] = React.useState(JSON.parse(localStorage.getItem('colors')) || []);
  function saveColors() {
    setSavedColors(prevSavedColors => {
      // instead of returning right away create a new array and save it in local storage
      const updatedColors = [...prevSavedColors, data.colors];
      localStorage.setItem('colors', JSON.stringify(updatedColors));
      return updatedColors;
    });
  }

  function handleChange(event) {
    const { name, value, type } = event.target
    setColorsData(prevColors => {
      return {
        ...prevColors,
        [name]: type === "color" ? value.substring(1) : value
      }
    })
  }

  if (loading) {
    return (
      <div className='loading-screen'>
        <h1>Loading...</h1>
        <div className='spinner'>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="App">
        <div style={{display: favoritesShown ? "none" : "block"}}>
          <div className='color-picker-container'>
            <input name="value" id='colorPicker' type="color" onChange={handleChange} value={`#${colorsData.value}`} />
            <div className='color-picker-labels'>
              <label htmlFor="colorPicker">Select your color</label>
              <label htmlFor="colorPicker">{`#${colorsData.value}`}</label>
            </div>
          </div>
          <div className='mode-picker-container'>
            <label htmlFor="colorMode">Choose the color mode</label>
            <select onChange={handleChange} type="select" name="mode" id="colorMode">
              <option value="monochrome">monochrome</option>
              <option value="monochrome-dark">monochrome-dark</option>
              <option value="monochrome-light">monochrome-light</option>
              <option value="analogic">analogic</option>
              <option value="complement">complement</option>
              <option value="analogic-complement">analogic-complement</option>
              <option value="triad">triad</option>
              <option value="quad">quad</option>
            </select>
          </div>

          <div className='colorscheme-container'>
            {data.colors.map(item => (
              <div className='colorscheme-item' key={item.hex.value}>
                <div style={{ background: `${item.hex.value}` }} className='colorscheme-color'></div>
                <p className='colorscheme-color__hex'>{item.hex.value}</p>
                <p>{item.name.value}</p>
              </div>
            ))}
          </div>
          <nav className='navigation'>
            <div className='buttons-holder'>
              <button className='remove-color-btn' onClick={removeColorCount}>-</button>
              <button onClick={saveColors} className='save-btn'>Save</button>
              <button onClick={displayFavorites} className='save-btn'>💙</button>
              <button className='add-color-btn' onClick={addColorCount}>+</button>
            </div>
          </nav>
        </div>

        <Favorites shown={favoritesShown ? "block" : "none"}/>
      </div>
    )
  }
}