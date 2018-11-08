
import { Notification } from 'electron';
/* global Notification */
/* eslint no-new:0 */
export default function notify(title, body) {
  //eslint-disable-next-line no-console
  console.log(`[Notification] ${title}: ${body}`);
  
  const notify = new Notification({
    title,
    body
  });

  notify.show();
}
