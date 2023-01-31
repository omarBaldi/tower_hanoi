/**
 * @desc recursively check if the HTML element contains
 * the data attribute based on the key param passed.
 *
 * @param {HTMLElement | null} currentElement
 * @param {string} dataAttributeKey
 * @param {number} stepsTaken
 * @returns {string | null}
 */
export const recursivelyCheckDataAttibute = ({
  currentElement,
  dataAttributeKey,
  stepsTaken = 0,
}: {
  currentElement: HTMLElement | null;
  dataAttributeKey: string;
  stepsTaken?: number;
}): string | null => {
  if (!currentElement || stepsTaken >= 3) return null;

  const dataAttributeValue: string | undefined = currentElement.dataset[dataAttributeKey];

  return typeof dataAttributeValue === 'string'
    ? dataAttributeValue
    : recursivelyCheckDataAttibute({
        currentElement: currentElement.parentElement,
        dataAttributeKey,
        stepsTaken: stepsTaken + 1,
      });
};
