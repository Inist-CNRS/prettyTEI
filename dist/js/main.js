$(function () {

  $("input[type=\"checkbox\"], input[type=\"radio\"]").not("[data-switch-no-init]").bootstrapSwitch();
  $('input[type=\"checkbox\"]').on('switchChange.bootstrapSwitch', function (event, state) {
    $('.modal-body').toggleClass("contentTei formTei");
  });

  /*
   * dropArea is the drag & drop zone
   * TEIFilesPlaceholder is the section to watch sended elements
   * nbOfFiles is an int incremented when send a file
   */
  var dropArea = $('#dropArea'),
    $TEIFilesPlaceholder = $("#TEIFilesPlaceholder").children(".row"),
    nbOfFiles = 0;

    // Get sended files infos if exists
    if (localStorage.teiFiles) {
        var currentTeiFiles = JSON.parse(localStorage.teiFiles);

        for(var i in currentTeiFiles){
            $TEIFilesPlaceholder.append(currentTeiFiles[i].figure);
            $("body").append(currentTeiFiles[i].modale);
        }
    }


    /*
     * readFile()
     * @param file is a single file got by HTML5 file api
     * @param nbOfFiles is an increment INT , to count all files sent to drag & dropp
     */
  function readFile(file, nbOfFiles) {
    // Loop through files with a closure so every FileReader are isolated.
    var reader = new FileReader();
    reader.onload = function (event) {
      // get file content , name

      var contenuReplaced;

      var name = file.name;
      var idName = name.replace(/\.|_/g , "-");
      var text = event.target.result;

      contenuReplaced = text.replace(/<head/g , "<div");
      contenuReplaced = contenuReplaced.replace(/<\/head>/g , "</div>");
      contenuReplaced = contenuReplaced.replace(/<hi/g , "<i");
      contenuReplaced = contenuReplaced.replace(/<\/hi>/g , "</i>");
      contenuReplaced = contenuReplaced.replace(/<note/g , "<div");
      contenuReplaced = contenuReplaced.replace(/<\/note>/g , "</div>");
      contenuReplaced = contenuReplaced.replace(/<p rend="footnote">/g , "");
      console.log("Contenu : " , contenuReplaced);


      //create figure & div modal
      var figure = $('<div class="col-xs-3"><figure></figure></div>'),
        modal = '<div class="modal fade" id="' + idName + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">\
                    <div class="modal-dialog teiModal">\
                      <div class="modal-content">\
                        <div class="modal-header">\
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                          <h4 class="modal-title" id="myModalLabel">' + name + '</h4>\
                        </div>\
                        <div class="modal-body contentTei">\
                          ' + contenuReplaced + '\
                        </div>\
                        <div class="modal-footer">\
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                        </div>\
                      </div>\
                    </div>\
                  </div>';

      // Add img & figcaption (file name) to figure
      figure.children("figure").append('<img src="vendor/img/xml.jpg" class="pictures" alt="xml picture" data-toggle="modal" data-target="#' + idName + '">', '<figcaption>' + name + '</figcaption>');

        console.log(figure[0].outerHTML);

        if (localStorage.teiFiles) {
            var currentTeiFiles = JSON.parse(localStorage.teiFiles);
            currentTeiFiles.push(
                {
                    name : idName,
                    figure : figure[0].outerHTML,
                    modale : modal
                }
            );
            localStorage.teiFiles = JSON.stringify(currentTeiFiles);
        }
        else{
            localStorage["teiFiles"] = JSON.stringify([
                    {
                        name : idName,
                        figure : figure[0].outerHTML,
                        modale : modal
                    }
                ]
            );
        }
      // Add all created elements to html
      $TEIFilesPlaceholder.append(figure);
      $("body").append(modal);

    };
    reader.readAsText(file, "UTF-8");

  }
  ;


  dropArea.bind({
    // Effect on dragover
    dragover: function () {
      $(this).addClass('hover');
      return false;
    },
    // Remove Class on dragleave
    dragleave: function () {
      $(this).removeClass('hover');
      return false;
    },
    //Function when drop file(s)
    drop: function (e) {
      $(this).removeClass('hover');
      e = e || window.event;
      e.preventDefault();

      e = e.originalEvent || e;

      var files = (e.files || e.dataTransfer.files);

      // For every file
      for (var i = 0; i < files.length; i++) {
        readFile(files[i], nbOfFiles);
        nbOfFiles++;
      }
    }
  });

  $(".glyphicon-trash").on("click" , function(){
     localStorage.clear();
      $TEIFilesPlaceholder.html('');
  });

});