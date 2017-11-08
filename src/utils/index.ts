export function pySegSort(arr) {
    var letters = "*abcdefghjklmnopqrstwxyz".split('');
    var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
    var segs = [];
    var curr;
    letters.forEach(function(item,i){
        curr = {letter: item, data:[]};
        arr.forEach(function(item2){
            if((!zh[i-1] || zh[i-1].localeCompare(item2,'zh') <= 0) && item2.localeCompare(zh[i],'zh') == -1) {
                curr.data.push(item2);
            }
        });
        if(curr.data.length) {
            segs.push(curr);
            curr.data.sort(function(a,b){
                return a.localeCompare(b,'zh');
            });
        }
    });
    return segs;
}

export function getColor():string{
    const colorArray= ['#5ed14f','#36b3a4','#4da9eb','#5e97f6','#5c6bc0','#9a7ddd','#bd84cd','#b38979','#ffa200','#f2525e']
    const num = Math.floor(Math.random()*10)
    return colorArray[num]
    
  }