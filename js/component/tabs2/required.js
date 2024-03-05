document.addEventListener('DOMContentLoaded', function() {
  
  const staticTabs = document.querySelectorAll('.tabs-component[data-tab-type=static]:not([data-tab-id-added=true])');
  if(!staticTabs.length) return;
  
  staticTabs.forEach(function(component, index) {
    component.setAttribute('id','static-tabs--' + index);
    component.setAttribute('data-tab-id-added',true);
  });

  const responsiveTabs = document.querySelectorAll('.tabs-component[data-tab-type=responsive]:not([data-tab-id-added=true])');
  if(!responsiveTabs.length) return;
  
  responsiveTabs.forEach(function(component, index) {
    component.setAttribute('id','responsive-tabs--' + index);
    component.setAttribute('data-tab-id-added',true);
  });

  const tabsLinks = document.querySelectorAll('.tabs-component:not([data-link-attrs-set=true])');
  if(!tabsLinks.length) return;

  tabsLinks.forEach(function(tabsLink) {
    tabsLink.setAttribute('data-link-attrs-set',true);
    let tabID = tabsLink.getAttribute('id');
    console.log('reqd: '+tabID)
    const listItems = tabsLink.querySelectorAll('.tabs-component__list-item');
    listItems.forEach(function(listItem) {
      const link = listItem.querySelector('a');
      const linkHref = link.getAttribute('href').split('#')[1];
      if(linkHref != '#panel--' + tabID + '--' + linkHref) {
        link.setAttribute('href', '#panel--' + tabID + '--' + linkHref);
      }
    });
    const panels = tabsLink.querySelectorAll('.tabs-component__panel');
      panels.forEach(function(panel) {
        panel.setAttribute('id', 'panel--' + tabID + '--' + panel.getAttribute('id'));
      });
  });
  
});