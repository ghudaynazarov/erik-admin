const option = document.getElementById('option');

function handleSelect(){
    const selected = option.options[option.selectedIndex];
    const pageUrl = selected.getAttribute('data-url');
    if (pageUrl) {
        window.location.href = pageUrl;
      }
};