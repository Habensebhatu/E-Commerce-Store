import { Component } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page-component.css']
   
})
export class FirstPageComponent {

  items = [
    {
        category: 'Food',
        image: 'busicuit.jpeg',
        link: 'https://syncflare.ai/'
    },
    {
        category: 'costomatic',
        image: 'Agor_Feet_Mask_1_1024x1024@2x.jpeg',
        link: 'http://164134.ao-alkmaar.nl/gezondeten/'
    },
    {
      category: 'Kleding',
      image: 'netsela.jpeg',
      link: 'http://164134.ao-alkmaar.nl/gezondeten/'
    },
    {
      category: 'Food',
      image: 'Berbere-2-247x296.jpeg',
      link: 'http://164134.ao-alkmaar.nl/gezondeten/'
    },
    // ... add more items as needed
];

}
