var maskingnumber_loaded = false;
(function (require, requirejs, define) {
	requirejs(["jquery"], function () {

		$.ajaxSetup({
			dataFilter: function (data, type) {
				var length = $('#agent-desktop-navbar').length;
				if (window.genesys.wwe.agent.id && !maskingnumber_loaded && length > 0) {
					console.log("checking masking number loaded");
					maskingnumber_loaded = true;

					// Ganti DOMSubtreeModified dengan MutationObserver
					var target = document.getElementById("agent-desktop-navbar");
					if (target) {
						var observer = new MutationObserver(function (mutationsList) {
							maskingNumber();
						});
						observer.observe(target, { childList: true, subtree: true });
					}
				}
				return data;
			}
		});

		var maskingNumber = function () {
			if (document) {
				var length = document.getElementsByClassName("origin-data-value").length;
				if (length == 0) {
					console.log("no number");
					return;
				}

				var wwePartyNames = document.getElementsByClassName("wwe-party-name");
				if (wwePartyNames.length > 0) {
					for (var i = 0; i < wwePartyNames.length; i++) {
						var wwePartyName = wwePartyNames[i];
						var txtContent = wwePartyName.textContent;
						if (txtContent.match(/[0-9]{5,}$/)) {
							txtContent = txtContent.slice(0, -5) + "*****";
							wwePartyName.textContent = txtContent;
							wwePartyName.setAttribute('title', txtContent);
						}
					}
				}

				var wweParties = document.getElementsByClassName("wwe-parties");
				if (wweParties.length > 0) {
					for (var i = 0; i < wweParties.length; i++) {
						var wwePartyName = wweParties[i];
						var txtContent = wwePartyName.textContent;
						if (txtContent.match(/^[0-9]{5,}$/)) {
							txtContent = txtContent.slice(0, -5) + "*****";
							wwePartyName.textContent = txtContent;
							wwePartyName.setAttribute('title', txtContent);
						}
					}
				}

				var wweButtonCallback = document.getElementsByClassName("wwe-button-choose-number");
				if (wweButtonCallback.length > 0) {
					for (var i = 0; i < wweButtonCallback.length; i++) {
						var wweButton = wweButtonCallback[i];
						if (wweButton) {
							wweButton.disabled = true;
						}
					}
				}

				var wwePhoneNumbers = document.getElementsByClassName("wwe-phone-number");
				if (wwePhoneNumbers.length > 0) {
					for (var i = 0; i < wwePhoneNumbers.length; i++) {
						var wwePhoneNumber = wwePhoneNumbers[i];
						var txtContent = wwePhoneNumber.textContent;
						if (txtContent.match(/[0-9]{5,}$/)) {
							txtContent = txtContent.slice(0, -5) + "*****";
							wwePhoneNumber.textContent = txtContent;
						}
					}
				}

				var wwePartyLabels = document.getElementsByClassName("wwe-party");
				if (wwePartyLabels.length > 0) {
					for (var i = 0; i < wwePartyLabels.length; i++) {
						var wwePartyLabel = wwePartyLabels[i];
						var txtContent = wwePartyLabel.textContent;
						var id = wwePartyLabel.id;
						if (id.startsWith("wweCaseBarParty") && txtContent.match(/[0-9]{5,}$/)) {
							console.log("content-need-to-be-changed:", wwePartyLabel.textContent);
							txtContent = txtContent.slice(0, -5) + "*****";
							wwePartyLabel.textContent = txtContent;
						}
					}
				}

				var wweOriginDatas = document.getElementsByClassName("origin-data-value");
				if (wweOriginDatas.length > 0) {
					for (var i = 0; i < wweOriginDatas.length; i++) {
						var wweOriginData = wweOriginDatas[i];
						var txtContent = wweOriginData.textContent;
						if (txtContent.match(/[0-9]{5,}$/)) {
							console.log("content-need-to-be-changed:", wweOriginData.textContent);
							txtContent = txtContent.slice(0, -5) + "*****";
							wweOriginData.textContent = txtContent;
							wweOriginData.setAttribute('title', txtContent);
						}
					}
				}
			}

		}

	});

}(window.genesys.wwe.lib.require, window.genesys.wwe.lib.requirejs, window.genesys.wwe.lib.define));