(function ($) {
    var settings = {
        templateReplaceItem: "{{item}}",
        templateKey: "<div class=\"tagalizer-item\">{{item}}<i class=\"fa fa-times-circle delete-tag\" aria-hidden=\"true\"></i></div>",
        onKeyUp: function(key, keyCode) {},
        onItemAdd: function(item, length) {},
        onDelete: function(index, value) {},
        onClickItem: function(index, value) {},
        onDuplicateItem: function() {}
    }
    var in_list = new Array();
    var tagEdit = {
        index: undefined,
        value: undefined,
        hasItemEdit: function() { return (this.index !== undefined && this.value !== undefined)},
        reset: function() {
            this.index = undefined;
            this.value = undefined;
        },
        length: function() { return this.value.length; }
    }

    $.fn.tagalizer = function(options) {
        var defaults = {
            input: "",
            initialValues: [],
            delimiters: [" ", ",", ";", "Enter"],
            serializerDelimiter: ";",
            regex: /[a-zA-Z\d-]+/,
            placeholder: "keyword",
            actionIn: "keyup", //This can be keyAnything
            duplicate: false,
            minLength: 3,
            maxLenght: 10
        };
        settings = $.extend( {}, settings, defaults, options );

        //Create place to put values of tags
        var input_placeholder = $(this).html('<input type="text" placeholder="' + settings.placeholder + '" class="tagalizer-placeholder"/>');

        //Notify and do the init actions
        onInit(settings.initialValues, settings.templateKey, settings.templateReplaceItem);
        bindClickEach(settings.onClickItem);

        input_placeholder.on(settings.actionIn, function(e) {
            if(e.keyCode == 8) {//Backspace
                if($('.tagalizer-placeholder').val().length == 0)
                    if(tagEdit.hasItemEdit())
                        onDelete(tagEdit.index)
                    else
                        onEdit();
                return;
            }

            var value = $('.tagalizer-placeholder').val();
            if((value.length >= settings.minLength && value.length == settings.maxLenght) ||
               (isDelimiter(settings.delimiters, e.key) && value.length >= settings.minLength && value.length <= settings.maxLenght)) {
                if(!settings.duplicate && isInList(value, in_list) && !tagEdit.hasItemEdit()) {
                    $('.tagalizer-placeholder').val("");
                    settings.onDuplicateItem();
                    return;
                }

                if(tagEdit.hasItemEdit()) {
                    in_list[tagEdit.index] = value;
                    tagEdit.reset();
                }
                else if(value.length == settings.maxLenght)
                    in_list.push(value)
                else {
                    var indexOfDelimiter = undefined;
                    for(var d in settings.delimiters)
                        if(value.indexOf(settings.delimiters[d]) != -1)
                            indexOfDelimiter = value.indexOf(settings.delimiters[d]);
                    in_list.push(value.substr(0, indexOfDelimiter));
                }

                if(settings.input)
                    setToInput(settings.input)

                //Notify when the item add
                settings.onItemAdd(value, value.length);

                //Remove all tags before
                $( '.tagalizer-placeholder' ).prev('.tagalizer-item-list').remove();
                $( '.tagalizer-placeholder' ).before( replaceTemplate(settings.templateKey, settings.templateReplaceItem, in_list) );

                bindEnd(settings.onClickItem);//Bind onClick in the last item
                clearInput('.tagalizer-placeholder');
            }
        });

        return this;
    };

    $.fn.tagalizer.getItens = function() {
        return in_list;
    }

    function isDelimiter(delimiters, key) {
        var has = delimiters.find(function(i) {
            return i === key
        });
        return has === undefined ? false : true;
    }

    function onInit(values, templateKey, templateReplaceItem) {
        if(values.length > 0) {//Set the init tags
            in_list = $.extend([], values);
            $( '.tagalizer-placeholder' ).before( replaceTemplate(templateKey, templateReplaceItem, in_list) );
        }
    }

    function onEdit() {
        tagEdit.index = $(".tagalizer-item:last-child").index();
        tagEdit.value = settings.regex.exec($(".tagalizer-item:last-child").html());

        $(".tagalizer-item:last-child").remove();
        $('.tagalizer-placeholder').val(tagEdit.value);
    }

    function onDelete(index) {
        settings.onDelete(index, in_list[index]);
        if(in_list.length == 1)
            in_list = new Array();
        else
            in_list.splice(index, 1);
        if(settings.input)
            setToInput(settings.input);
    }

    function setToInput(input) {
        clearInput(input)
        $(input).val(seriliazerTag(settings.serializerDelimiter));
    }

    function bindEnd(callback) {
        $(".tagalizer-item-list > .tagalizer-item:last-child").bind('click', function() {
            callback.call(this, $('.tagalizer-item-list > .tagalizer-item').index(this), $(this).html());
        });
        bindDelete();
    }

    function bindClickEach(callback) {
        $(".tagalizer-item").each(function(i) {
            var index = i;
            $(this).on('click', function()  {
                callback.call(this, index, $(this).html());
            })
        });
        bindDelete();
    }

    function bindDelete() {
        $(".tagalizer-item").each(function(i) {
            var index = i;
            $(this).find('.delete-tag').on('click', function()  {
                onDelete(i)
                $(this).parent().remove();
            })
        });
    }

    function isInList(item, list) {
        var has = false;
        for(var l in list) {
            if(list[l] == item.trim())
                has = true;
        }
        return has
    }

    function clearInput(selector) {
        $(selector).val("");
    }

    function replaceTemplate(template, replacer, itens) {
        var __template = template;
        var content = "";
        for(var i = 0; i < itens.length; i++)
            content += __template.replace(replacer, itens[i])

        return "<div class='tagalizer-item-list'>" + content + "</div>";
    }

    function seriliazerTag(delimiter) {
        var result = '';
        for(var i in in_list) {
            if(i == (in_list.length - 1))
                result += settings.regex.exec(in_list[i]);
            else
                result += settings.regex.exec(in_list[i]) + delimiter;
        }
        return result;
    }
}(jQuery));
