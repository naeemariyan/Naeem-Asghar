function update_selected_variants(p_id){
  var template, productSelections, productCheckboxs, selectedOptions, checkedOptions, selectedItems, matchedVariant, variantIdField;
  template = document.getElementById('product-string-tempalte-'+p_id).innerHTML;
  template = JSON.parse(template.replaceAll("'", ""));
  
  productSelections = document.querySelectorAll("#product-variants-"+p_id+" select");
  productCheckboxs  = document.querySelectorAll("#product-variants-"+p_id+" input[type=radio]:checked");
  variantIdField = document.querySelector("#product-selected-variant-"+p_id);

  selectedOptions = Array.from(productSelections).map((select)=> select.value);
  checkedOptions = Array.from(productCheckboxs).map((select)=> select.value);

  selectedItems = checkedOptions.concat(selectedOptions);
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

document.querySelectorAll('.product-grid-form').forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        var previousAlertBox = form.querySelector('.alertbox-error');
        if (previousAlertBox) {
          previousAlertBox.remove();
        }

        var alertBox = '';
        var previousAlertBox = form.querySelector('.alertbox-error');
        if (previousAlertBox) {
          previousAlertBox.remove();
        }
        form.querySelectorAll('[data-required]').forEach(function(field) {
          if (field.getAttribute('type') === 'radio') {
            var radios = form.querySelectorAll(`input[type="radio"][name="${field.name}"]`);
            var isChecked = Array.from(radios).some(radio => radio.checked);
            if (!isChecked && alertBox.includes(field.getAttribute('data-required')) == false) {
              alertBox += `<span>Please select a ${field.getAttribute('data-required')}.</span><br>`;
            }
          } else if (field.tagName.toLowerCase() === 'select') {
            if (!field.value) {
              alertBox += `<span>Please select a ${field.getAttribute('data-required')}.</span><br>`;
            }
          } else if (!field.value) {
            alertBox += `<span>Please enter a ${field.getAttribute('data-required')}.</span><br>`;
          }
        });

        if (alertBox) {
          var alertDiv = document.createElement('div');
          alertDiv.className = 'alertbox-error';
          alertDiv.innerHTML = alertBox;
          form.querySelector('.form-footer').appendChild(alertDiv);
          return false;
        }
        form.submit();
        return true;
      });
    });


