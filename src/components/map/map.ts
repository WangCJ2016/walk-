import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http'
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  @ViewChild('map_container') map_container: ElementRef;
  map: any;//地图对象

  constructor(private geolocation: Geolocation,
    private http: Http) {
    
  }
  ngOnInit() {
    this.loadMap();
    alert(1)
    // this.geolocation.getCurrentPosition()
    // .then(res => {
    //   console.log('geolocation'+res.coords.latitude+'-'+res.coords.longitude)
    //   const lat = res.coords.latitude;
    //   const long = res.coords.longitude;
    //   this.http.get('http://restapi.amap.com/v3/assistant/coordinate/convert',{
    //     params: {
    //       'locations': long+','+lat,
    //       coordsys: 'gps',
    //       key:'6663b7c310afefd453fc478fca2453c3'
    //   }}).subscribe(v => console.log(v))
    //   new AMap.convertFrom(new AMap.LngLat(lat, long), 'gps', function(status, result) {
    //     console.log(status+result.locations[0].lng+'-'+result.locations[0].lat)
    //     this.map = new AMap.Map(this.map_container.nativeElement, {
    //         zoom: 15, //设置地图缩放级别
    //         center: [result.locations[0].lat, result.locations[0].lng]
    //     })

    //     const Geocoder = new AMap.Geocoder();
    //     Geocoder.getAddress(new AMap.LngLat(result.locations[0].lng, result.locations[0].lat), function(status, result) {
    //       console.log('getAddress'+result.regeocode.addressComponent)
    //       if (result.info === 'ok' || result.info === 'OK') {
    //         console.log(result.regeocode.addressComponent)
    //       }
    //     })
    //   })
    // })
  }
  loadMap() {
    this.http.get('http://restapi.amap.com/v3/assistant/coordinate/convert',{
      params: {
        locations: 120.064986536743+','+30.29185637326135,
        coordsys: 'gps',
        key:'17801686afbe4797d60af3df3d1bcd2f'
    }}).map(res => res.json()).subscribe(v => {
      const locations = v.locations.split(',')
      console.log(locations)
      this.map = new AMap.Map(this.map_container.nativeElement, {
        zoom: 16, //设置地图缩放级别
        center:[locations[0],locations[1]]
    });
    }
    )
    
}
}
