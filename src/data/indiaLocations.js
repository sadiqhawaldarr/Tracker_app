const INDIA_LOCATIONS = [
  {
    state: 'Andaman and Nicobar Islands',
    cities: [
      { name: 'Port Blair', lat: 11.6234, lng: 92.7265 },
    ],
  },
  {
    state: 'Andhra Pradesh',
    cities: [
      { name: 'Amaravati', lat: 16.5131, lng: 80.5165 },
      { name: 'Vijayawada', lat: 16.5062, lng: 80.6480 },
      { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
      { name: 'Guntur', lat: 16.3067, lng: 80.4365 },
      { name: 'Tirupati', lat: 13.6288, lng: 79.4192 },
    ],
  },
  {
    state: 'Arunachal Pradesh',
    cities: [
      { name: 'Itanagar', lat: 27.0844, lng: 93.6053 },
      { name: 'Naharlagun', lat: 27.1047, lng: 93.6952 },
      { name: 'Tawang', lat: 27.5861, lng: 91.8594 },
    ],
  },
  {
    state: 'Assam',
    cities: [
      { name: 'Dispur', lat: 26.1433, lng: 91.7898 },
      { name: 'Guwahati', lat: 26.1445, lng: 91.7362 },
      { name: 'Silchar', lat: 24.8333, lng: 92.7789 },
      { name: 'Dibrugarh', lat: 27.4728, lng: 94.9120 },
    ],
  },
  {
    state: 'Bihar',
    cities: [
      { name: 'Patna', lat: 25.5941, lng: 85.1376 },
      { name: 'Gaya', lat: 24.7914, lng: 85.0002 },
      { name: 'Bhagalpur', lat: 25.2425, lng: 86.9842 },
      { name: 'Muzaffarpur', lat: 26.1197, lng: 85.3910 },
    ],
  },
  {
    state: 'Chandigarh',
    cities: [
      { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    ],
  },
  {
    state: 'Chhattisgarh',
    cities: [
      { name: 'Raipur', lat: 21.2514, lng: 81.6296 },
      { name: 'Bhilai', lat: 21.1938, lng: 81.3509 },
      { name: 'Bilaspur', lat: 22.0797, lng: 82.1409 },
    ],
  },
  {
    state: 'Dadra and Nagar Haveli and Daman and Diu',
    cities: [
      { name: 'Daman', lat: 20.3974, lng: 72.8328 },
      { name: 'Silvassa', lat: 20.2763, lng: 73.0083 },
    ],
  },
  {
    state: 'Delhi',
    cities: [
      { name: 'New Delhi', lat: 28.6139, lng: 77.2090 },
      { name: 'Delhi', lat: 28.7041, lng: 77.1025 },
    ],
  },
  {
    state: 'Goa',
    cities: [
      { name: 'Panaji', lat: 15.4909, lng: 73.8278 },
      { name: 'Margao', lat: 15.2832, lng: 73.9862 },
      { name: 'Vasco da Gama', lat: 15.3860, lng: 73.8440 },
    ],
  },
  {
    state: 'Gujarat',
    cities: [
      { name: 'Gandhinagar', lat: 23.2156, lng: 72.6369 },
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
      { name: 'Surat', lat: 21.1702, lng: 72.8311 },
      { name: 'Vadodara', lat: 22.3072, lng: 73.1812 },
      { name: 'Rajkot', lat: 22.3039, lng: 70.8022 },
    ],
  },
  {
    state: 'Haryana',
    cities: [
      { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
      { name: 'Gurugram', lat: 28.4595, lng: 77.0266 },
      { name: 'Faridabad', lat: 28.4089, lng: 77.3178 },
      { name: 'Panipat', lat: 29.3909, lng: 76.9635 },
    ],
  },
  {
    state: 'Himachal Pradesh',
    cities: [
      { name: 'Shimla', lat: 31.1048, lng: 77.1734 },
      { name: 'Dharamshala', lat: 32.2190, lng: 76.3234 },
      { name: 'Mandi', lat: 31.7087, lng: 76.9320 },
    ],
  },
  {
    state: 'Jammu and Kashmir',
    cities: [
      { name: 'Srinagar', lat: 34.0837, lng: 74.7973 },
      { name: 'Jammu', lat: 32.7266, lng: 74.8570 },
      { name: 'Anantnag', lat: 33.7311, lng: 75.1487 },
    ],
  },
  {
    state: 'Jharkhand',
    cities: [
      { name: 'Ranchi', lat: 23.3441, lng: 85.3096 },
      { name: 'Jamshedpur', lat: 22.8046, lng: 86.2029 },
      { name: 'Dhanbad', lat: 23.7957, lng: 86.4304 },
    ],
  },
  {
    state: 'Karnataka',
    cities: [
      { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
      { name: 'Mysuru', lat: 12.2958, lng: 76.6394 },
      { name: 'Hubballi', lat: 15.3647, lng: 75.1240 },
      { name: 'Mangaluru', lat: 12.9141, lng: 74.8560 },
      { name: 'Belagavi', lat: 15.8497, lng: 74.4977 },
      { name: 'Vijayapura / Bijapur 586101', lat: 16.8302, lng: 75.71 },
      { name: 'Kalaburagi', lat: 17.3297, lng: 76.8343 },
    ],
  },
  {
    state: 'Kerala',
    cities: [
      { name: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
      { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
      { name: 'Kozhikode', lat: 11.2588, lng: 75.7804 },
      { name: 'Thrissur', lat: 10.5276, lng: 76.2144 },
    ],
  },
  {
    state: 'Ladakh',
    cities: [
      { name: 'Leh', lat: 34.1526, lng: 77.5771 },
      { name: 'Kargil', lat: 34.5539, lng: 76.1349 },
    ],
  },
  {
    state: 'Lakshadweep',
    cities: [
      { name: 'Kavaratti', lat: 10.5593, lng: 72.6358 },
    ],
  },
  {
    state: 'Madhya Pradesh',
    cities: [
      { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
      { name: 'Indore', lat: 22.7196, lng: 75.8577 },
      { name: 'Jabalpur', lat: 23.1815, lng: 79.9864 },
      { name: 'Gwalior', lat: 26.2183, lng: 78.1828 },
    ],
  },
  {
    state: 'Maharashtra',
    cities: [
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { name: 'Pune', lat: 18.5204, lng: 73.8567 },
      { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
      { name: 'Nashik', lat: 19.9975, lng: 73.7898 },
      { name: 'Aurangabad', lat: 19.8762, lng: 75.3433 },
      { name: 'Solapur', lat: 17.6599, lng: 75.9064 },
    ],
  },
  {
    state: 'Manipur',
    cities: [
      { name: 'Imphal', lat: 24.8170, lng: 93.9368 },
    ],
  },
  {
    state: 'Meghalaya',
    cities: [
      { name: 'Shillong', lat: 25.5788, lng: 91.8933 },
      { name: 'Tura', lat: 25.5144, lng: 90.2024 },
    ],
  },
  {
    state: 'Mizoram',
    cities: [
      { name: 'Aizawl', lat: 23.7271, lng: 92.7176 },
      { name: 'Lunglei', lat: 22.8900, lng: 92.7422 },
    ],
  },
  {
    state: 'Nagaland',
    cities: [
      { name: 'Kohima', lat: 25.6751, lng: 94.1086 },
      { name: 'Dimapur', lat: 25.8629, lng: 93.7537 },
    ],
  },
  {
    state: 'Odisha',
    cities: [
      { name: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
      { name: 'Cuttack', lat: 20.4625, lng: 85.8830 },
      { name: 'Rourkela', lat: 22.2604, lng: 84.8536 },
      { name: 'Puri', lat: 19.8135, lng: 85.8312 },
    ],
  },
  {
    state: 'Puducherry',
    cities: [
      { name: 'Puducherry', lat: 11.9416, lng: 79.8083 },
      { name: 'Karaikal', lat: 10.9254, lng: 79.8380 },
    ],
  },
  {
    state: 'Punjab',
    cities: [
      { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
      { name: 'Ludhiana', lat: 30.9010, lng: 75.8573 },
      { name: 'Amritsar', lat: 31.6340, lng: 74.8723 },
      { name: 'Jalandhar', lat: 31.3260, lng: 75.5762 },
    ],
  },
  {
    state: 'Rajasthan',
    cities: [
      { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
      { name: 'Jodhpur', lat: 26.2389, lng: 73.0243 },
      { name: 'Udaipur', lat: 24.5854, lng: 73.7125 },
      { name: 'Kota', lat: 25.2138, lng: 75.8648 },
      { name: 'Ajmer', lat: 26.4499, lng: 74.6399 },
    ],
  },
  {
    state: 'Sikkim',
    cities: [
      { name: 'Gangtok', lat: 27.3314, lng: 88.6138 },
      { name: 'Namchi', lat: 27.1667, lng: 88.3639 },
    ],
  },
  {
    state: 'Tamil Nadu',
    cities: [
      { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
      { name: 'Coimbatore', lat: 11.0168, lng: 76.9558 },
      { name: 'Madurai', lat: 9.9252, lng: 78.1198 },
      { name: 'Tiruchirappalli', lat: 10.7905, lng: 78.7047 },
      { name: 'Salem', lat: 11.6643, lng: 78.1460 },
    ],
  },
  {
    state: 'Telangana',
    cities: [
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
      { name: 'Warangal', lat: 17.9689, lng: 79.5941 },
      { name: 'Nizamabad', lat: 18.6725, lng: 78.0941 },
      { name: 'Karimnagar', lat: 18.4386, lng: 79.1288 },
    ],
  },
  {
    state: 'Tripura',
    cities: [
      { name: 'Agartala', lat: 23.8315, lng: 91.2868 },
    ],
  },
  {
    state: 'Uttar Pradesh',
    cities: [
      { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
      { name: 'Kanpur', lat: 26.4499, lng: 80.3319 },
      { name: 'Varanasi', lat: 25.3176, lng: 82.9739 },
      { name: 'Agra', lat: 27.1767, lng: 78.0081 },
      { name: 'Prayagraj', lat: 25.4358, lng: 81.8463 },
      { name: 'Meerut', lat: 28.9845, lng: 77.7064 },
    ],
  },
  {
    state: 'Uttarakhand',
    cities: [
      { name: 'Dehradun', lat: 30.3165, lng: 78.0322 },
      { name: 'Haridwar', lat: 29.9457, lng: 78.1642 },
      { name: 'Haldwani', lat: 29.2183, lng: 79.5130 },
    ],
  },
  {
    state: 'West Bengal',
    cities: [
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
      { name: 'Howrah', lat: 22.5958, lng: 88.2636 },
      { name: 'Siliguri', lat: 26.7271, lng: 88.3953 },
      { name: 'Durgapur', lat: 23.5204, lng: 87.3119 },
      { name: 'Asansol', lat: 23.6739, lng: 86.9524 },
    ],
  },
];

export default INDIA_LOCATIONS;
