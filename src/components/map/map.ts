import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
  @Output() address = new EventEmitter<string>()
  @ViewChild('map_container') map_container: ElementRef;
  map: any;//地图对象
  location: string
  constructor(private geolocation: Geolocation,
    private http: Http) {
      
  }
  ngOnInit() {
    // gps 获取经纬度
    this.geolocation.getCurrentPosition()
    .then(res => {
  
      const lat = res.coords.latitude;
      const long = res.coords.longitude;
      // 转化高德坐标
      this.http.get('http://restapi.amap.com/v3/assistant/coordinate/convert',{
        params: {
          'locations': long+','+lat,
          coordsys: 'gps',
          key:'17801686afbe4797d60af3df3d1bcd2f'
      }}).map(res => res.json()).subscribe(v => {
        console.log(v)
        const locations = v.locations.split(',')
        // 生成地图
        this.map = new AMap.Map(this.map_container.nativeElement, {
          zoom: 16, //设置地图缩放级别
          center: [locations[0], locations[1]]
        });
        // 根据经纬度获取位置信息
        AMap.service('AMap.Geocoder',  ()=> {
          const geocoder = new AMap.Geocoder();
          geocoder.getAddress(new AMap.LngLat(locations[0], locations[1]), (status, result) => {
            if (result.info === 'ok' || result.info === 'OK') {
              this.address.emit(JSON.stringify({lng: locations[0],lat:locations[1],trueAddress:result.regeocode.formattedAddress}))
              // 绘制信息窗体
              var info = [];
              info.push("<div>"+result.regeocode.formattedAddress+"</div>")
              const infoWindow = new AMap.InfoWindow({
                  content: info.join("<br>"),
                  offset: new AMap.Pixel(10, -30)
              });
              infoWindow.open(this.map, [locations[0], locations[1]]);
              // 绘制maker点
              this.map.clearMap();
              var marker = new AMap.Marker({
                  map: this.map,
                  position: [locations[0], locations[1]]
              });
              infoWindow.open(this.map, marker.getPosition());
            }
          })
        })
      })
      })
  }
  
}
