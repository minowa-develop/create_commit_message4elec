import { DataGetter } from "./base/data/data-getter.js";
import { ElementGetter } from "./base/element-getter.js";
import { CommitMessageCreator } from "./domain/commit-message-creator.js";
import { Exportor } from "./domain/exportor.js";
import { FavoriteRegister } from "./domain/favorite/favorite-register.js";
import { FavoriteSetter } from "./domain/favorite/favorite-setter.js";
import { HistoryRegister } from "./domain/history/history-register.js";
import { HistorySetter } from "./domain/history/history-setter.js";
import { importer } from "./domain/importer.js";
import { Initialyzer } from "./domain/initialyzer.js";
import { RepositorySwitcher } from "./domain/repository/repository-switcher.js";

// リポジトリ変更時
ElementGetter.getElementById('tools').addEventListener('click', async () => {
  RepositorySwitcher.switch();
});
ElementGetter.getElementById('documents').addEventListener('click', async () => {
  RepositorySwitcher.switch();
});

/**
 * コミットメッセージ作成などの処理を行う
 */
ElementGetter.getElementById('createMessage').addEventListener('click', async () => {
  const obj = DataGetter.get();
  ElementGetter.getInputElementById("commit_message").value = CommitMessageCreator.create(obj);
  HistorySetter.show();
  HistoryRegister.regist(obj);
});

/**
 * 作成したコミットメッセージをコピーする
 */
ElementGetter.getElementById('copy').addEventListener('click', async () => {
  navigator.clipboard.writeText(ElementGetter.getInputElementById("commit_message").value);
  alert("message copied!");
});


ElementGetter.getElementById('initialize').addEventListener('click', async () => {
  Initialyzer.initialize();
});


ElementGetter.getElementById('exportData').addEventListener('click', async () => {
  Exportor.export();
});


ElementGetter.getElementById('import_file').addEventListener('change', async () => {
  importer.import();
});


ElementGetter.getElementById('favoriteRegist').addEventListener('click', async () => {
  FavoriteRegister.regist(DataGetter.get());
});

window.onload = function() {
  // load post method
  RepositorySwitcher.switch();
  HistorySetter.show();
  FavoriteSetter.show();
}