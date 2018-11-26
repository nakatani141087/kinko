var fs = new ActiveXObject("Scripting.FileSystemObject");
var file = fs.OpenTextFile("read.txt");

/* 1行目のみ読み込む */
text[0] = file.ReadLine();