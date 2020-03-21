import React from 'react';

import './shop.styles.css';
import SHOP_DATA from './shop.data.js';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';


class ShopPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Collections: SHOP_DATA
        }



    }

    render() {
        const  {Collections}  = this.state;
        return (
            <div className='shop-page'>
            { 
                Collections.map(  ({id, ...otherCollectionProps}) => (
                 <CollectionPreview key={id} { ...otherCollectionProps} />
                ))
            }
                
            </div>
        );

    }



    
};


export default ShopPage;