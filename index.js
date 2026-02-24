'use strict';

hexo.extend.filter.register('before_post_render', function (data) {

  let backgroundColor = 'var(--link-card-bg)';
  let titleColor = 'var(--link-card-title)';
  let descColor = 'var(--link-card-desc)';
  let iconDisplay = 'var(--link-card-icon-display, block)';

  data.content = data.content.replace(/----*\n\n([^\n]*)\n([a-zA-Z]*:\/\/[^\n]*)\n\n----*/g, function(match, title, url) {
    let domain = '';
    try {
      domain = new URL(url).hostname;
    } catch (e) {
      domain = url.replace(/^[a-zA-Z]*:\/\//, '').split('/')[0];
    }
    let faviconUrl = `https://favicon.im/${domain}`;
    
    return `<a target="_blank" href="${url}" style="position: relative; display: -webkit-box; display: -webkit-flex; display: -ms-flexbox; display: flex; box-sizing: border-box; -webkit-flex-direction: row; -ms-flex-direction: row; flex-direction: row; -webkit-align-items: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center; width: 390px; min-height: 84px; border-radius: 8px; max-width: 100%; overflow: hidden; margin: 16px auto; padding: 12px 12px 9px 12px; background-color: ${backgroundColor};"><span class="LinkCard-contents" style="flex: 1; min-width: 0;"><span style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; max-height: 40px; line-height: 1.25; color: ${titleColor};">${title}</span><span style="display: -webkit-box; font-size: 13px; height: 18px; line-height: 18px; color: ${descColor}; word-break: break-all; text-overflow: ellipsis; overflow: hidden; -webkit-line-clamp: 1; -webkit-box-orient: vertical;"><span style="display: inline-flex; align-items: center;"><svg class="Zi Zi--InsertLink" fill="currentColor" viewBox="0 0 24 24" width="14" height="14"><path d="M13.414 4.222a4.5 4.5 0 1 1 6.364 6.364l-3.005 3.005a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l3.005-3.005a2.5 2.5 0 1 0-3.536-3.536l-3.005 3.005a.5.5 0 0 1-.707 0l-.707-.707a.5.5 0 0 1 0-.707l3.005-3.005zm-6.187 6.187a.5.5 0 0 1 .638-.058l.07.058.706.707a.5.5 0 0 1 .058.638l-.058.07-3.005 3.004a2.5 2.5 0 0 0 3.405 3.658l.13-.122 3.006-3.005a.5.5 0 0 1 .638-.058l.069.058.707.707a.5.5 0 0 1 .058.638l-.058.069-3.005 3.005a4.5 4.5 0 0 1-6.524-6.196l.16-.168 3.005-3.005zm8.132-3.182a.25.25 0 0 1 .353 0l1.061 1.06a.25.25 0 0 1 0 .354l-8.132 8.132a.25.25 0 0 1-.353 0l-1.061-1.06a.25.25 0 0 1 0-.354l8.132-8.132z"></path></svg></span><span>${url}</span></span></span><span class="LinkCard-icon" style="display: ${iconDisplay}; margin-left: 12px; flex-shrink: 0;"><img src="${faviconUrl}" alt="favicon" style="width: 48px; height: 48px; border-radius: 4px; object-fit: contain;"></span></a>`;
  });

  return data;

});

hexo.extend.filter.register('after_render:html', function (str) {
  var cfg = hexo.config.link_card || {};
  var theme = (hexo.theme && hexo.theme.config && hexo.theme.config.color) || {};

  var bgLight = cfg.bg_color || theme.body_bg_color || '#F6F6F6';
  var bgDark = cfg.bg_color_dark || theme.body_bg_color_dark || '#181c27';
  var titleLight = cfg.title_color || theme.post_heading_color || '#121212';
  var titleDark = cfg.title_color_dark || theme.post_heading_color_dark || '#c4c6c9';
  var descLight = cfg.desc_color || theme.sec_text_color || '#999';
  var descDark = cfg.desc_color_dark || theme.sec_text_color_dark || '#a7a9ad';
  
  var showIcon = cfg.icon !== false;
  var iconDisplay = showIcon ? 'block' : 'none';

  var style = '<style>'
    + ':root{--link-card-bg:' + bgLight + ';--link-card-title:' + titleLight + ';--link-card-desc:' + descLight + ';--link-card-icon-display:' + iconDisplay + '}'
    + 'html[data-user-color-scheme="dark"]{--link-card-bg:' + bgDark + ';--link-card-title:' + titleDark + ';--link-card-desc:' + descDark + '}'
    + '@media(prefers-color-scheme:dark){html:not([data-user-color-scheme="light"]){--link-card-bg:' + bgDark + ';--link-card-title:' + titleDark + ';--link-card-desc:' + descDark + '}}'
    + '</style>';

  return str.replace('</head>', style + '</head>');
});