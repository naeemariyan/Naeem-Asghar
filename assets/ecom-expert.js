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

function togglerLight(id, cls) {
  document.getElementById(id).classList.toggle(cls);
}

