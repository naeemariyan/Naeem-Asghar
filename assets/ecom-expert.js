function update_selected_variants(p_id){
  var template, productSelections, productCheckboxs, selectedOptions, checkedOptions, selectedItems, matchedVariant, variantIdField;
  template = document.getElementById('product-string-tempalte-'+p_id).innerHTML;
  template = JSON.parse(template.replaceAll("'", ""));
  
  productSelections = document.querySelectorAll("#product-variants-"+p_id+" select");
  productCheckboxs  = document.querySelectorAll("#product-variants-"+p_id+" input[type=radio]:checked");
  variantIdField = document.querySelector("#product-selected-variant-"+p_id);

  selectedOptions = Array.from(productSelections).map((select)=> select.value);
  checkedOptions = Array.from(productCheckboxs).map((select)=> select.value);

  selectedItems = selectedOptions.concat(checkedOptions);
  matchedVariant = template.variants.find(variant => {
    return variant.options.every((option, index)=> option === selectedItems[index]);
  })
  if(!matchedVariant){
      console.log('here');
       matchedVariant = template.variants.find(variant => {
          return variant.options.some((option, i) => variant.options.includes(selectedItems[i]));
       });
  }
  if(matchedVariant){
    variantIdField.value = matchedVariant.id;
  }
}

function togglerLight(id, cls, $this) {
  var element = document.querySelector('#'+id);
  element.classList.toggle(cls);
  if(cls == 'menu-collapse'){
    $this.querySelectorAll('.icon').forEach(function(icon) {
      icon.classList.toggle("hidden");
    });
  }
}

var forms, alertBox; 
forms = document.querySelectorAll('.product-grid-form');
if (forms.length > 0) {
  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      form.querySelectorAll('[data-required]').forEach(function(field){
        if(field.getAttribute('type') == 'radio'){
          var isChecked = Array.from(field).some(radio => radio.checked);
          if(!isChecked){
            alertBox .= '<span>Please select a '+field.getAttribute('data-required')+'. </span>';
          }
        }else if(field.tagName.toLowerCase() == 'select' ){
          var isSelected = Array.from(field).some(select => select.value);
          if(!isSelected){
            alertBox .= '<span>Please select a '+field.getAttribute('data-required')+'. </span>';
          }
        }
      });
      if(alertBox){
        form.querySelector('.form-footer').appendChild('<div class="alertbox-error">'+alertBox+'</div>');
        return false;
      }
      return true;
    });
  });
}


