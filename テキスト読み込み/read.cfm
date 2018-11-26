<!DOCTYPE html>
<html lang="ja">

<head>
 <meta charset = "utf-8">
 <title> read</title>
</head>

<body>

<cffile action="Read"
  file="read.txt"
  variable="Message">

<cfoutput>
  #Message#
</cfoutput>
  

<script src="read.js"></script>
</body>
</html>