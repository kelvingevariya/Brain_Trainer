/* eslint-disable max-len */
import CONFIG from '../config'
import { ERRORS } from '../utils/errors.util'
import { FirebaseDynamicLinks } from 'firebase-dynamic-links'

const { DynamicLinkError } = ERRORS

const { FIREBASE } = CONFIG
const { API_KEY, DOMAIN_URI_PREFIX, ANDROID_PACKAGE_NAME, IOS_BUNDLE_NAME, IOS_APPLE_ID } = FIREBASE
const { SOCIAL_METADATA_TITLE, SOCIAL_METADATA_DESC, SOCIAL_METADATA_IMAGE } = FIREBASE
const firebaseDynamicLinks = new FirebaseDynamicLinks(API_KEY)

/**
 * Generates dynamic link based on `userId` and `verificationId`.
 */
export const generateVerificationLink = (userId: number, verificationId: string) => firebaseDynamicLinks.createLink({
  dynamicLinkInfo: {
    domainUriPrefix: DOMAIN_URI_PREFIX,
    link: encodeURI(`https://www.gosquire.com/open-on-mobile?userId=${userId}&verificationId=${verificationId}`),
    androidInfo: {
      androidPackageName: ANDROID_PACKAGE_NAME
    },
    iosInfo: {
      iosBundleId: IOS_BUNDLE_NAME,
      iosAppStoreId: IOS_APPLE_ID
    }
  }
})
  .catch((error) => Promise.reject(new DynamicLinkError(error.error.message)))
/**
 * Generates dynamic link based on `flightId` and `section`.
 */
export const generateDeepLink = (flightId: number, section?: string) => firebaseDynamicLinks.createLink({
  dynamicLinkInfo: {
    domainUriPrefix: DOMAIN_URI_PREFIX,
    link: section? encodeURI(`https://www.gosquire.com/open-on-mobile?section=${section}`) :
      encodeURI(`https://www.gosquire.com/open-on-mobile?flightId=${flightId}`),
    androidInfo: {
      androidPackageName: ANDROID_PACKAGE_NAME
    },
    iosInfo: {
      iosBundleId: IOS_BUNDLE_NAME,
      iosAppStoreId: IOS_APPLE_ID
    },
    socialMetaTagInfo: {
      socialTitle: SOCIAL_METADATA_TITLE,
      socialDescription: SOCIAL_METADATA_DESC,
      socialImageLink: SOCIAL_METADATA_IMAGE
    }
  }
})
  .catch((error) => Promise.reject(new DynamicLinkError(error.error.message)))

/**
 * Generates a deep link based on content data and type.
 */
const generateLink = (content: any, type: string): string => {
  let link = ''
  switch (type) {
    case 'sharedCustomItem':
      link = encodeURI(`https://www.gosquire.com/share?id=${content.id}&title=${content.title}&description=${content.description}&content_type=${content?.contentType}&content_type_title=${content?.contentTypeTitle}&url=${content?.url}&video_preview_url=${content?.videoPreviewUrl}&designed_url=${content?.designedUrl}&image=${content?.image}&full_image=${content?.fullImage}&source=${content?.interactiveOnboardingSource?.title}`)
      break
    case 'sharedFeedContent':
      link = encodeURI(`https://www.gosquire.com/share?id=${content.id}&scheduler_item_id=${content.scheduler_item_id}&order=${content.order}&title=${content.title}&description=${content.description}&content_type=${content.content_type}&url=${content.url}&video_preview_url=${content.video_preview_url}&designed_url=${content.designed_url}&image=${content.image}&full_image=${content.full_image}&source=${content.source}&feed_flight_id=${content?.feed_flight_id}`)
      break
    case 'feedContent':
      link = encodeURI(`https://www.gosquire.com/open-on-mobile?id=${content.id}&scheduler_item_id=${content.scheduler_item_id}&order=${content.order}&title=${content.title}&description=${content.description}&content_type=${content.content_type}&url=${content.url}&video_preview_url=${content.video_preview_url}&designed_url=${content.designed_url}&image=${content.image}&full_image=${content.full_image}&source=${content.source}&feed_flight_id=${content?.feed_flight_id}`)
      break
    case 'todayHistory':
      link = encodeURI(`https://www.gosquire.com/open-on-mobile?id=${content.id}&content_type=TodayInHistory&originalTitle=${content.originalTitle}&displayTitle=${content.displayTitle}&displayDescription=${content.displayDescription}&displayLink=${content.displayLink}&date=${content.date}&preferred=${content.preferred}&createdAt=${content.createdAt}&updatedAt=${content.updatedAt}`)
      break
    case 'games':
      link = encodeURI(`https://www.gosquire.com/open-on-mobile?id=${content.id}&content_type=Game&title=${content.title}&icon=${content.icon}&url=${content.url}&script=${content.script}&status=${content.status}&goals=${content.goals}&instruction=${JSON.stringify(content.instruction)}&createdAt=${content.createdAt}&updatedAt=${content.updatedAt}`)
      break
    case 'news':
      link = encodeURI(`https://www.gosquire.com/open-on-mobile?newsId=${content.newsId}&content_type=News&title=${content.title}&description=${content.description}&category=${content.category}&image=${content.image}&link=${content.link}&publishedDate=${content.publishedDate}`)
      break
    case 'caricature':
      link = encodeURI(`https://www.gosquire.com/open-on-mobile?id=${content.feedCaricatureId}&content_type=Caricature&title=${content.title}&image=${content.newImage}&author=${content.author}&date=${content.formattedPublishedDate}`)
      break
    case 'existing-caricature':
      link = encodeURI(`https://www.gosquire.com/open-on-mobile?id=${content.id}&content_type=Caricature&title=${content.title}&image=${content.image}&author=${content.author}&date=${content.date}`)
      break
  }
  return link
}

/**
 * Generates dynamic link based on the basis of type.
 */
export const generateDeepLinkForEmail = (content: any, type: string) => {
  const link = generateLink(content, type)
  return firebaseDynamicLinks.createLink({
    dynamicLinkInfo: {
      domainUriPrefix: DOMAIN_URI_PREFIX,
      // eslint-disable-next-line max-len
      link,
      androidInfo: {
        androidPackageName: ANDROID_PACKAGE_NAME
      },
      iosInfo: {
        iosBundleId: IOS_BUNDLE_NAME,
        iosAppStoreId: IOS_APPLE_ID
      },
      socialMetaTagInfo: {
        socialTitle: SOCIAL_METADATA_TITLE,
        socialDescription: SOCIAL_METADATA_DESC,
        socialImageLink: SOCIAL_METADATA_IMAGE
      }
    }
  })
    .catch((error) => Promise.reject(new DynamicLinkError(error?.error?.message)))
}
