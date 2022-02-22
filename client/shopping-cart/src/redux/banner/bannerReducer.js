import { HIDE_BANNER, SHOW_BANNER } from "./bannerTypes"

const initialBannerState = {
    showBanner: false,
    apiSuccessResponse: '',
    apiErrorResponse: '',
}

const bannerReducer = (state = initialBannerState, action) => {
    switch(action.type){
        case SHOW_BANNER: {
            return {
                showBanner: true,
                apiErrorResponse: action.payload?.apiErrorResponse,
                apiSuccessResponse: action.payload?.apiSuccessResponse
            }
        }

        case HIDE_BANNER: {
            return {
                showBanner: false,
                apiErrorResponse: '',
                apiSuccessResponse: '',
            }
        }

        default: {
            return state
        }
    }
}

export default bannerReducer;