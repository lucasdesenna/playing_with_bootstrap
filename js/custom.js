// <li class="scroll-group-item">
//   <img src="img/parlour_thumb.png">
//   <div>
//     <p>Salão Toniolo p/ Carecas</p>
//     <small>Rua dos Bobos 0 - Itaim Bibi</small>
//     <div class="rating">
//       <div class="full"></div>
//       <div class="full"></div>
//       <div class="full"></div>
//       <div></div>
//       <div></div>
//     </div>
//   </div>
// </li>

//<div class="scroll-group-heading">9999 salões encontrados</div>
"use strict";

var custom = {
  scrollGroup: {
    show: function(container, callback){
      $(container).fadeIn('slow', function() {
        if(callback) {
          callback();
        }

        $(container).mCustomScrollbar();
      });
    },

    hide: function(container, callback){
      $(container).mCustomScrollbar('destroy');
      $(container).fadeOut('slow', callback);
    },

    populate: function(container, data) {
      var scrollGroupHeading = function(data) {
        var scrollGroupHeading = $('<div></div>').addClass('scroll-group-heading');
        var msg;

        if(data.length) {
          if(data.length == 1) {
            msg = data.length + " salão encontrado.";
          } else {
            msg = data.length + " salões encontrados.";
          }
        } else {
          msg = "Nenhum salão encontrado.";
        }

        $(scrollGroupHeading).html(msg);

        return scrollGroupHeading
      }(data);

      var scrollGroupItems = function(data) {
        var scrollGroupItems = [];

        for(var d in data) {
          var scrollGroupItem = $('<li></li>').addClass('scroll-group-item');

          var thumb = $('<img>')
          .attr({
            src: data[d].thumb,
            alt: data[d].name
          });

          var wrapper = $('<div></div>');

          var name = $('<p></p>')
          .html(data[d].name);

          var address = $('<small></small>')
          .html(data[d].address);

          var rating = function(score) {
            if(typeof score == 'string') {
              score = parseInt(score);
            }

            var rating = $('<div></div>').addClass('rating');

            for(var i = 1; i <= 5; i++) {
              var star = $('<div></div>');

              if(i <= score) {
                $(star).addClass('full');
              }

              $(rating).append(star);
            };

            return rating;
          }(data[d].rating);

          $(wrapper)
          .append(name)
          .append(address)
          .append(rating);

          $(scrollGroupItem)
          .append(thumb)
          .append(wrapper);

          scrollGroupItems.push(scrollGroupItem);
        }

        return scrollGroupItems;
      }(data);

      $(container)
      .append(scrollGroupHeading)
      .append(scrollGroupItems);
    },

    update: function(container, serviceUrl) {
      custom.scrollGroup.hide(container, function() {
        $(container).empty();
        custom.scrollGroup.populate(container, [
          {
            thumb: 'img/parlour_thumb.png',
            name: 'AAAA',
            address: 'BBBB',
            rating: 4
          },
          {
            thumb: 'img/parlour_thumb.png',
            name: 'AAAA',
            address: 'BBBB',
            rating: 1
          },
          {
            thumb: 'img/parlour_thumb.png',
            name: 'AAAA',
            address: 'BBBB',
            rating: 4
          },
          {
            thumb: 'img/parlour_thumb.png',
            name: 'AAAA',
            address: 'BBBB',
            rating: 1
          },
          {
            thumb: 'img/parlour_thumb.png',
            name: 'AAAA',
            address: 'BBBB',
            rating: 4
          },
          {
            thumb: 'img/parlour_thumb.png',
            name: 'AAAA',
            address: 'BBBB',
            rating: 1
          }
        ]);
        custom.scrollGroup.show(container);
        // $.ajax(serviceUrl, {
        //   success: function(result){
        //     var formatData = function(result) {
        //       var formated;
        //       //format
        //       return formated
        //     };

        //     var data = formatData(result);

        //     $(container).empty();
        //     custom.scrollGroup.populate(container, data);
        //     custom.scrollGroup.show(container);
        //   },

        //   error: function(result){
        //     console.log(result);
        //     alert("Erro ao carregar lista.\nTente novamente.")
        //   }
        // });
      });
    }
  }
}