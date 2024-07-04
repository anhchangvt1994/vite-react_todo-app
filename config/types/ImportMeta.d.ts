interface ImportMeta {
    env: Env;
}

interface Env {
    PORT:                        number;
    IO_PORT:                     number;
    LOCAL_ADDRESS:               string;
    LOCAL_HOST:                  string;
    IPV4_ADDRESS:                string;
    IPV4_HOST:                   string;
    IO_HOST:                     string;
    ROUTER_BASE_PATH:            string;
    ROUTER_HOME_PATH:            string;
    ROUTER_HOME_ID:              string;
    ROUTER_TODO_DETAIL_PATH:     string;
    ROUTER_TODO_DETAIL_ID:       string;
    ROUTER_CONTENT_PATH:         string;
    ROUTER_CONTENT_COMMENT_PATH: string;
    ROUTER_COMMENT_PATH:         string;
    ROUTER_COMMENT_ID:           string;
    ROUTER_LOGIN_PATH:           string;
    ROUTER_LOGIN_ID:             string;
    ROUTER_SIGN_UP_PATH:         string;
    ROUTER_SIGN_UP_ID:           string;
    ROUTER_NOT_FOUND_PATH:       string;
    API_BASE_URL:                string;
    STYLE_COLOR_DARK:            string;
    STYLE_COLOR_YELLOW:          string;
    STYLE_COLOR_BLUE:            string;
    STYLE_COLOR_WHITE:           string;
    STORE_SLICE_USER:            string;
    STORE_SLICE_TODO_LIST:       string;
    STORE_SLICE_STORAGE:         string;
    STORE_SLICE_LOADING_STATUS:  string;
    STORE_TAG_TODO_LIST:         StoreTagTodoList;
    VALIDATION_EMAIL:            string;
    VALIDATION_NAME:             string;
}

interface StoreTagTodoList {
    type: string;
    id:   string;
}
