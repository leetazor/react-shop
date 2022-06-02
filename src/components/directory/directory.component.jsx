import DirectoryItem from '../directory-item/directory-item.component';
import './directory.styles.scss';

import RedWinesImage from '../../assets/images/red-wine.jpg';
import WhiteWinesImage from '../../assets/images/white-wine.jpg';
import SparklingWinesImage from '../../assets/images/sparkling-wine.jpg';
import MixedDozensImage from '../../assets/images/mixed-dozen.jpg';
import FineRareImage from '../../assets/images/fine-rare.jpg';

const categories = [
  {
    "id": 1,
    "title": "Red Wines",
    "imageUrl": RedWinesImage,
    //"imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
    route: 'shop/redwines'
  },
  {
    "id": 2,
    "title": "White Wines",
    "imageUrl": WhiteWinesImage,
    // "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
    route: 'shop/whitewines'
  },
  {
    "id": 3,
    "title": "Sparkling Wines",
    "imageUrl": SparklingWinesImage,
    //"imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
    route: 'shop/sparklingwines'
  },
  {
    "id": 4,
    "title": "Mixed Dozens",
    "imageUrl": MixedDozensImage,
    //"imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
    route: 'shop/mixeddozens'
  },
  {
    "id": 5,
    "title": "Fine & Rare",
    "imageUrl": FineRareImage,
    //"imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
    route: 'shop/fineandrare'
  }
];

const Directory = () => {
  return (
    <div className='directory-container'>
      {categories.map(( category ) => (
        <DirectoryItem  key={category.id} category={category} />
      ))}
    </div>
  )
}
    
export default Directory;