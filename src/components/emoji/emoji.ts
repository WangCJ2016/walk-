import { Component } from '@angular/core';

/**
 * Generated class for the EmojiComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'emoji',
  templateUrl: 'emoji.html'
})
export class EmojiComponent {

  emojiArray: Array<any> = []

  constructor() {
    // const emojiString = `😁,😂,🤣,😀,😬,😃,😄,😅,😆,😇,😉,😊,🙂,🙃,😋,😌,😍,😘,😗,😙,😚,😜,😝,😛,🤑,🤓,😎,🤡,🤠,🤗,😏,😶,😐,
    //   😑,😒,🙄,🤔,🤥,😳,😞,😟,😠,😡,😔,😕,🙁,😣,😖,😫,😩,😤,😮,😱,😨,😰,😯,😦,😧,😢,😥,🤤,😪,😓,😭,😵,😲,🤐,🤢,🤧,😷,🤒,🤕,😴`
     
    //const emojiArray = emojiString.split(',')
      // for(let i=0;i<emojiArray.length-1;i+18) {
      //   this.emojiArray.push(emojiArray.slice(i,i+18))
      // }
      // console.log(this.emojiArray)
  }

}
