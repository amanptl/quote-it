import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Lake Como',
    description: 'Best lake in the world!',
    imageUrl:
      'https://www.themostexpensivehomes.com/wp-content/uploads/2014/01/George-Clooney-Lake-Como-view.jpg',
    address: ' Lombardy, Italy',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  },
  {
    id: 'p3',
    title: 'Mansion',
    description: 'Beautiful Mansion!',
    imageUrl:
      'https://photos.smugmug.com/Europe/Italy/Lake-Como/i-Z3cWNcb/0/0e4f9555/728x485/visiting%20Bellagio%20%20in%20lake%20como%20Italy-728x485.jpg',
    address: ' Switzerland, Italy',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  },{
    id: 'p4',
    title: 'Goa Beach',
    description: 'Natural Beauty!',
    imageUrl:
      'https://lp-cms-production.imgix.net/image_browser/Querim_beach_Goa.jpg?format=auto?crop=entropy&fit=crop&h=421&sharp=10&vib=20&w=748',
    address: ' Goa, India',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u2'
  },
  {
    id: 'p5',
    title: 'Mount Everest',
    description: 'Highest peak in the world!',
    imageUrl:
      'https://static01.nyt.com/images/2019/05/27/world/26everest2-print/merlin_155279730_9a078aae-b874-4b50-9ff4-72a8ec2a93ae-superJumbo.jpg',
    address: 'Arunachal, India',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u3'
  },
  {
    id: 'p6',
    title: 'Maldives',
    description: 'Travel Destination!!',
    imageUrl:
      'https://qtxasset.com/styles/breakpoint_sm_default_480px_w/s3/Hotel%20Management-1508949476/mercuremaldiveskoodooresortmaldivesexterior.jpg?WWgDUsRsMcW_pe0hMJIE2bW06qaPPNMI&itok=U5WkdR5g',
    address: 'Maldives Island, Maldives',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u3'
  }
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
