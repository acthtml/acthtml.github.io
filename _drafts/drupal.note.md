
drupal_bootstrap
  1. config
    - set_error_handle
    - drupal_settings_initialize
  2. page chace
  3. database
    - install attempt
    - drupal_valid_test_ua
    - spl_autoload_register
  4. variables
    - lock_initialize
    - variable_initalize
    - module_load_all(bootstrap)
  5. session init
    - session_set_save_handler
  6. page header
    - boostrap_invoke_all('boot')
    - drupal_page_header
  7. language init
  8. bootstrap full
    - module_load_all
    - drupal_path_initialize
    - menu_set_custom_theme
    - drupal_theme_initialize
    - module_invoke_all('init')
menu_execute_active_handle


# module.inc

模块的加载和交互。

- 模块的加载（加载全部，只加载bootstrap）
- 模块列表
- 模块依赖处理
- 模块的开启或关闭
- hooks system
  - module_invoke($module, $hook)
  - module_invoke_all($hook)

# path.inc

处理系统路径，包括路径别名。

- get normal path
- get alias path
- lookup path (建立缓存，快速过滤无须查询的接口。)
- path load
- path save
- path delete

# menu.inc

路由系统。

可定义导航菜单和对应url请求所返回的内容。
