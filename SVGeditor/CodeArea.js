function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}
function setCaretPosition(element, offset) {
    var range = document.createRange();
    var sel = window.getSelection();

    //select appropriate node
    var currentNode = null;
    var previousNode = null;

    for (var i = 0; i < element.childNodes.length; i++) {
        //save previous node
        previousNode = currentNode;

        //get current node
        currentNode = element.childNodes[i];
        //if we get span or something else then we should get child node
       while(currentNode.childNodes.length > 0){
          currentNode = currentNode.childNodes[0];
       }

        //calc offset in current node
        if (previousNode != null) {
            offset -= previousNode.length;
        }
        //check whether current node has enough length
        if (offset <= currentNode.length) {
            break;
        }
    }
    //move caret to specified offset
    if (currentNode != null) {
        range.setStart(currentNode, offset);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
function ExtractInfo(Code){
    var i, command, tmp;
    var type   = [];
    var text   = [];
    var params = [];
    command = Code.match(/([A-Z])([^A-Z]*)/gi);
    if (command != null){
        for (i = 0; i < command.length; i++){
            type.push(command[i][0]);
            tmp = command[i].substring(1,command[i].length).split(/([ , \n])/);
            tmp = tmp.filter(val => val !== ""); 
            text.push([]);
            text[i] =text[i].concat(tmp);
            tmp = command[i].substring(1,command[i].length).split(/[ , \n]/);
            tmp = tmp.filter(val => val !== "");                       
            params.push([]);
            params[i] = params[i].concat(tmp);
        }
    }
    return{type, text, params};
}
function FormatCode(Info, Code){    
    console.log(Code);
    var type   = Info.type;
    var text   = Info.text;
    var params = Info.params;
    var FormattedCode = "";
    var i, j, cnt, hint, plen, tlen;
    var x0 = 0;
    var y0 = 0;
    var x = [];
    var y = [];
    var Flag=true;
    if (type.length==0){
        FormattedCode = "<span class=\"error\">"+Code+"</span>";
        console.log(111);
        console.log(FormattedCode);
    }
    else if (Code.replace(/[\n\r]+/g, '').replace(/\s{2,10}/g, ' ')[0].toUpperCase()!='M'){        
        FormattedCode = "<span class=\"error\">"+Code+"</span>";
        console.log(222);
        console.log(FormattedCode);
    }
    else{
        for(i = 0;  i < type.length; i++){
            switch(type[i].toUpperCase()){
                case 'M':
                    if (type[i] == "M") hint = ["x", "y"];
                    else                hint = ["dx", "dy"];
                    break;
                case 'L':
                    if (type[i] == "L") hint = ["x", "y"];
                    else                hint = ["dx", "dy"];
                    break;
                case 'H':
                    if (type[i] == "H") hint = ["x"];
                    else                hint = ["dx"];
                    break;
                case 'V':
                    if (type[i] == "V") hint = ["y"];
                    else                hint = ["dy"];
                    break;
                case 'C':                    
                    if (type[i] == "C") hint = ["x1", "y1", "x2", "y2", "x", "y"];
                    else                hint = ["dx1", "dy1", "dx2", "dy2", "dx", "dy"];
                    break;
                case 'S':                    
                    if (type[i] == "S") hint = ["x2", "y2", "x", "y"];
                    else                hint = ["dx2", "dy2", "dx", "dy"];
                    break;
                case 'Q':                    
                    if (type[i] == "Q") hint = ["x1", "y1", "x", "y"];
                    else                hint = ["dx1", "dy1", "dx", "dy"];
                    break;
                case 'T':
                    if (type[i] == "T") hint = ["x", "y"];
                    else                hint = ["dx", "dy"];
                    break;
                case 'A':
                    if (type[i] == "T") hint = ["rx", "ry", "angle", "large-arc-flag", "sweep-flag", "x", "y"];
                    else                hint = ["rx", "ry", "angle", "large-arc-flag", "sweep-flag", "dx", "dy"];
                    break;
                case 'Z':
                    hint = [];
                    break;
                default:
                    Flag = false;
                    FormattedCode += "<span class=\"error\">"+type[i]+text[i].join("")+"</span>";
                    console.log(333);
                    console.log(FormattedCode);
                    break;
            }
            if (Flag){
                FormattedCode += type[i];
                cnt  = 0;
                plen = params[i].length;
                tlen = text[i].length;
                for (j = 0; j < hint.length; j++){
                    if (j < plen){        
                        while (true){
                            if ((text[i][cnt] == " ") || (text[i][cnt] == ",") || (text[i][cnt] == "/n")){
                                FormattedCode += text[i][cnt];
                                cnt++;
                                console.log(444);
                                console.log(FormattedCode);
                            }
                            if (text[i][cnt] == params[i][j]){
                                if (isNaN(text[i][cnt])){
                                    FormattedCode += "<span class=\"error\">"+text[i][cnt]+"</span>";
                                    Flag  = false;
                                    console.log(555);
                                    console.log(FormattedCode);
                                }
                                else{
                                    FormattedCode += text[i][cnt];
                                    switch (hint[j]){
                                        case "x":
                                            x0 = parseFloat(params[i][j]);
                                            break;
                                        case "y":
                                            y0 = parseFloat(params[i][j]);
                                            break;
                                        case "dx":
                                            x0 += parseFloat(params[i][j]);
                                            break;
                                        case "dy":
                                            y0 += parseFloat(params[i][j]);
                                            break;
                                    }
                                    x.push(x0);
                                    y.push(y0);
                                    console.log(666);
                                    console.log(FormattedCode);
                                }
                                cnt++;
                                break;
                            }
                        }                        
                    }
                    else{
                        if (j == plen){                           
                            FormattedCode += text[i].slice(cnt,tlen).join("");
                            cnt = tlen;
                            console.log(777);
                            console.log(FormattedCode);
                        }
                        FormattedCode += "<span class=\"space\"> </span>"+"<span class=\"hint\">"+hint[j]+"</span>";
                        Flag  = false;
                        console.log(888);
                        console.log(FormattedCode);
                    }
                }
                if (plen == hint.length) {
                    FormattedCode += text[i].slice(cnt,tlen).join("");
                    console.log(999);
                    console.log(FormattedCode);
                }
                else{
                    FormattedCode += "<span class=\"error\">"+text[i].slice(cnt,tlen).join("")+"</span>";
                    console.log(000);
                    console.log(FormattedCode);
                }
                if (j < plen){
                    Flag = false;
                    console.log("zzz");
                    console.log(FormattedCode);
                }
            }
        }
    }
    console.log("lalalalalalal");

    if (Flag){
        return {FormattedCode:FormattedCode, Coor:{x, y}};
    }
    else{
        return {FormattedCode:FormattedCode, Coor:null};
    }
}