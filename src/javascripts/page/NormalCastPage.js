import $ from 'jquery'
import Page from '../page/Page';
import AutoRedirectButton from "../buttons/AutoRedirectButton";
import AutoEnterCommunityButton from "../buttons/AutoEnterCommunityButton";
import Common from "../common/Common";
import Time from "../common/Time";
import IdHolder from "../modules/IdHolder";
import ExtendedBar from "../modules/ExtendedBar";
import Napi from "../api/Api";

const idHolder = new IdHolder();
const autoRedirectButton = new AutoRedirectButton();
const autoEnterCommunityButton = new AutoEnterCommunityButton();
const extendedBar = new ExtendedBar();

export default class NormalCastPage extends Page {
  putButton() {
    $('.meta').append(autoRedirectButton.getDom());
    $('.meta').append(autoEnterCommunityButton.getDom());
  }

  setUpButton() {
    chrome.runtime.sendMessage({
        purpose: 'getFromLocalStorage',
        key: 'options.autoJump.enable'
      },
      function (response) {
        if (Common.enabledOrNull(response)) {
          autoRedirectButton.toggleOn();
        } else {
          autoRedirectButton.toggleOff();
        }
      }
    );
    chrome.runtime.sendMessage({
        purpose: 'getFromNestedLocalStorage',
        key: 'autoEnterCommunityList'
      },
      function (response) {
        if (response[idHolder.communityId]) {
          autoEnterCommunityButton.toggleOn();
        } else {
          autoEnterCommunityButton.toggleOff();
        }
      }
    );
  }

  putExtendedBar() {
    extendedBar.put('#watch_player_top_box');
  }

  setUpExtendedBar(timeCounter) {
    extendedBar.setUp();
  }

  countExtendedBar() {
    extendedBar.countDown();
  }

  updateExtendedBar(response) {
    extendedBar.update(reseponse);
  }

  invalidateExtendedBar() {
    extendedBar.invalidate();
  }
}