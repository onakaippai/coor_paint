function GetImageCode(TtlCde, OrgH, W, H){
    var svg = new Blob([TtlCde], {type:"image/svg+xml;charset=utf-8"}),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg);
    var y0 = -(480 - OrgH) / 2;
    var Code = "<image x=\"0\" y=\""+y0+"px\" height=\""+H+"\" width=\""+W+"\" xlink:href=\""+url+"\" opacity=\"0.3\"></image>";
    return Code;
}
function GetPathCode(Info, OrgW, OrgH, W, H){
    var i, j, width;
    width = OrgW/W;
    var Path = "<path d=\"";
    for (i = 0; i < Info.type.length; i++){
        if (i == 0) Path += Info.type[i];
        else        Path += " "+Info.type[i];
        for (j = 0; j < Info.params[i].length; j++){
            Path += " "+Info.params[i][j];
        }
    }
    var tmp =  "<svg width=\""+OrgW+"\" height=\""+OrgH+"\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\">"+Path+"\" stroke=\"black\" stroke-width=\""+width+"\" fill=\"none\" /></svg>";    
    Path += "\" stroke=\"black\" stroke-width=\"1\" fill=\"none\" />";
    var svg = new Blob([tmp], {type:"image/svg+xml;charset=utf-8"}),
        domURL = self.URL || self.webkitURL || self,
        url = domURL.createObjectURL(svg);
    var Code = "<image x=\"0\" y=\"0\" height=\""+H+"\" width=\""+W+"\" xlink:href=\""+url+"\"></image>";
    return {Code, Path};
}
function GetPointCode(Coor, OrgW, W){
    var i, x, y;
    var Zoom = W/OrgW;
    var Code = "";
    for (i = 0; i < Coor.x.length; i++){
        x = Coor.x[i]*Zoom;
        y = Coor.y[i]*Zoom;
        Code += "<circle cx=\""+x+"\" cy=\""+y+"\" r=\"3\" fill=\"red\" onmouseover=\"showText(this.getBoundingClientRect(), "+Coor.x[i]+","+Coor.y[i]+")\" ondblclick=\"copyText("+Coor.x[i]+","+Coor.y[i]+")\" onmouseout=\"clText()\"/>";
    }
    Over = true;
    return Code;
}
function showText(el, x, y){
    if (Over){
        CoorBoxObj.style.padding = '5px';
        CoorBoxObj.style.left = (el.left - Coor00Obj.getBoundingClientRect().left + 5) + 'px';
        CoorBoxObj.style.top  = (el.top - Coor00Obj.getBoundingClientRect().top + 5) + 'px';
        CoorBoxObj.innerHTML  = "("+x+","+y+")";
        Over = false;
    }
}
function copyText(x, y){
    const elem = document.createElement('textarea');
    elem.value = x+" "+y;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}
function clText(){
    CoorBoxObj.style.padding = '0px';
    CoorBoxObj.innerHTML     = "";
    Over = true;
}