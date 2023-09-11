export function Htmlconverter(html,css,js){
    const HTMLcode = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    ::-webkit-scrollbar{
        display: none;
    }
    ${css}
    </style>
    </head>
    <body style=" height: 97vh; background-color: antiquewhite;">
    ${html}
    </body>
    <script>
    ${js}
   </script> 
    </html>
    `

    return HTMLcode
}