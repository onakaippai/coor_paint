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
            console.log(preCaretRange.toString().split(''))
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
    var len    = [];
    var params = [];
    command = Code.match(/([A-Z])([^A-Z]*)/gi);
    if (command != null){
        for (i = 0; i < command.length; i++){
            type.push(command[i][0]);
            tmp = command[i].substring(1,command[i].length).trim().split(/(?:,| )+/);
            len.push(tmp.length);
            params = params.concat(tmp);
            //console.log(type); 
        }
    }
    return{type, len, params};
}
function FormatCode(Info, Code){
    var type   = Info.type;
    var len    = Info.len;
    var params = Info.params;
    var FormattedCode = Code;
    var i, j, x, y, Flag=true;
    Code = Code.replace(/\n\n/gi, '<div><br></div>');
    if (Code.includes('\n')) Code = Code.replace('\n', '<div>').replace('\n', '</div><div>')+'</div>';
    if (type.length==0){
        FormattedCode = "<span style=\"background-color:red;\">"+Code+"</span>";        
        //FormattedCode = Code;
    }
    else if (type[0].toUpperCase()!='M'){        
        FormattedCode = "<span style=\"background-color:red;\">"+Code+"</span>";
        //FormattedCode = Code;
    }
    else{
        for(i = 0;  i < type.length; i++){
            switch(type[i].toUpperCase()){
                case 'M':
                    if (len[i] != 2){

                    }
                    else{

                    }
                    break;
                case 'L':
                    if (len[i] != 2){

                    }
                    else{

                    }
                    break;
                case 'H':
                    if (len[i] != 1){

                    }
                    else{

                    }
                    break;
                case 'V':
                    if (len[i] != 1){

                    }
                    else{

                    }
                    break;
                case 'C':
                    if (len[i] != 6){

                    }
                    else{

                    }
                    break;
                case 'S':
                    if (len[i] != 4){

                    }
                    else{

                    }
                    break;
                case 'Q':
                    if (len[i] != 4){

                    }
                    else{

                    }
                    break;
                case 'T':
                    if (len[i] != 2){

                    }
                    else{

                    }
                    break;
                case 'A':
                    if (len[i] != 7){

                    }
                    else{

                    }
                    break;
                case 'Z':
                    if (len[i] != 0){

                    }
                    else{

                    }
                    break;
                default:
                    break;
            }
        }
    }
    if (Flag){
        return {FormattedCode, Coor:{x, y}};
    }
    else{
        return {FormattedCode, Coor:null};
    }
}