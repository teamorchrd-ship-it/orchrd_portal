/**
 * @typedef {Object} Feedback
 * @property {number} rating - 1-5 star rating, required
 * @property {string} primaryUse - selected primary-use option
 * @property {string} favoriteFeature - selected favorite-feature option
 * @property {string} missingFeature - free text, "what confused you"
 * @property {string} likelihoodToUse - Definitely | Probably | Maybe | Not likely
 * @property {string} expectedPrice - selected price bucket
 * @property {string} email - contact email, required
 * @property {boolean} wantsInterview - opted into a 15-minute interview
 * @property {boolean} wantsNotify - opted into launch notification
 * @property {string} createdAt - ISO timestamp
 */

/** @param {Omit<Feedback, 'createdAt'>} fields @returns {Feedback} */
export function buildFeedback(fields) {
  return { ...fields, createdAt: new Date().toISOString() };
}
