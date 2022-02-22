import { HIDE_BANNER, SHOW_BANNER } from "./bannerTypes"

export const showBanner = (data) => {
    return {
        type: SHOW_BANNER,
        payload: data
    }
}

export const hideBanner = () => {
    return {
        type: HIDE_BANNER
    }
}