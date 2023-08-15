import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import Swiper from 'swiper';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class  HomepageComponent{

  constructor() {}
  cols: Observable<number> = of(4);
  slides = [
    {
      image: '../assets/image/bgslide.jpg',
      animationClass: 'layer-animation-3',
      promoTitle: 'limited edition',
      promoText: 'Sale Offer 20% Off This Week',
      mainTitle: 'Top Popular',
      mainSubtitle: 'Accessories 2022',
      subtitle: 'Light knit upper adapts to the shape of your foot for flexible and natural movement.',
      buttonUrl: 'shop-grid.html'
    },
    {
      image: '../assets/image/bgwebshop.png',
    },
    // other slides go here...
  ];

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
        const primarySwiper = new Swiper('#primary_slider', {
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        const categoriesSwiper = new Swiper('#categories_slider', {
          slidesPerView: 4, // Display 4 images at once
          navigation: {
              nextEl: '.categories-slider-wrapper .swiper-arrow.next',
              prevEl: '.categories-slider-wrapper .swiper-arrow.prev',
          },
      });
      const trendingProducts = new Swiper('#trendingProducts_slider', {
        slidesPerView: 4, // Display 4 images at once
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
      },
    });
      
    }, 500); 
}


  

products = [
  {
      imageUrl: '../assets/image/Berbere1.jpg',
      new: 'berbere',
      newPrice: "€71.05",
      category: 'Food'
  },
  {
   
    imageUrl: '../assets/image/HairStyle .avif',
    new: 'hairStyle',
    newPrice: "€21.05",
    category: 'Cosmetica'
},
{
  imageUrl: '../assets/image/facuxTas1.jpeg',
  new: 'facuxTas',
  newPrice: "€41.25",
  category: 'Cosmetica'
},
{
  
  imageUrl: '../assets/image/jurk.avif',
  new: 'jurk',
  newPrice: "€61.20",
  category: 'Kleding'
},
{
  
  imageUrl: '../assets/image/shoes.webp',
  new : 'shoes',
  newPrice: "€31.20",
  category: 'Cosmetica'
},
{
 
  imageUrl: '../assets/image/sokken.webp',
  new : 'sokken',
  newPrice: "$31.05",
  category: 'Cosmetica'
},
 
];

trendingProducts = [
  {
      id: 1,
      title: "Strive Shoulder Pack",
      imageUrl: '../assets/image/glas.webp',
      sale: true,
      new: 'berbere',
      manufacturer: "Graphic Corner",
      manufacturerId: 1,
      rating: 5,
      newPrice: "€71.05",
      category: 'Food'
  },
  {
    id: 1,
    title: "Strive Shoulder Pack",
    imageUrl: '../assets/image/tas.webp',
    sale: true,
    new: 'hairStyle',
    manufacturer: "Graphic Corner",
    manufacturerId: 1,
    rating: 5,
    newPrice: "€21.05",
    category: 'Cosmetica'
},
{
  id: 1,
  title: "Strive Shoulder Pack",
  imageUrl: '../assets/image/tshdi.webp',
  sale: true,
  new: 'facuxTas',
  manufacturer: "Graphic Corner",
  manufacturerId: 1,
  rating: 5,
  newPrice: "€41.25"
},
{
  id: 1,
  title: "Strive Shoulder Pack",
  imageUrl: '../assets/image/blackOwend.avif',
  sale: true,
  new: 'jurk',
  manufacturer: "Graphic Corner",
  manufacturerId: 1,
  rating: 5,
  newPrice: "€61.20"
},

{
  id: 1,
  title: "Strive Shoulder Pack",
  imageUrl: '../assets/image/koffiemat.webp',
  sale: true,
  new: 'jurk',
  manufacturer: "Graphic Corner",
  manufacturerId: 1,
  rating: 5,
  newPrice: "€61.20"
},

{
  id: 1,
  title: "Strive Shoulder Pack",
  imageUrl: '../assets/image/koffieceremobie.webp',
  sale: true,
  new: 'jurk',
  manufacturer: "Graphic Corner",
  manufacturerId: 1,
  rating: 5,
  newPrice: "€61.20"
},

  // ... Add more products here
];
}



