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

document.querySelectorAll('.product-grid-form').forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear any previous alert messages
        const previousAlertBox = form.querySelector('.alertbox-error');
        if (previousAlertBox) {
          previousAlertBox.remove();
        }

        let alertBox = '';

        form.querySelectorAll('[data-required]').forEach(function(field) {
          if (field.getAttribute('type') === 'radio') {
            // Get all radio buttons with the same name
            const radios = form.querySelectorAll(`input[type="radio"][name="${field.name}"]`);
            const isChecked = Array.from(radios).some(radio => radio.checked);
            if (!isChecked) {
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
          const alertDiv = document.createElement('div');
          alertDiv.className = 'alertbox-error';
          alertDiv.innerHTML = alertBox;
          form.querySelector('.form-footer').appendChild(alertDiv);
          return false;
        }

        return true;
      });
    });


