var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var data = [];
var editingId = null;
var form = document.getElementById("form");
var nameInput = document.getElementById("name");
var fatherNameInput = document.getElementById("fatherName");
var genderInput = document.getElementById("gender");
var phoneInput = document.getElementById("phone");
var languagesInput = document.getElementById("languages");
var dobInput = document.getElementById("dob");
var photoInput = document.getElementById("photo");
var balanceInput = document.getElementById("balance");
var tableBody = document.querySelector("#dataTable tbody");
var submitButton = document.getElementById("submitButton");
form.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var name, fatherName, gender, phone, languages, dob, balance, base64Photo, index, newData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                event.preventDefault();
                name = nameInput.value.trim();
                fatherName = fatherNameInput.value.trim();
                gender = genderInput.value;
                phone = phoneInput.value.trim();
                languages = Array.from(languagesInput.selectedOptions).map(function (opt) { return opt.value; });
                dob = dobInput.value;
                balance = parseFloat(balanceInput.value);
                base64Photo = "";
                if (!(photoInput.files && photoInput.files.length > 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, toBase64(photoInput.files[0])];
            case 1:
                base64Photo = _a.sent();
                _a.label = 2;
            case 2:
                if (editingId !== null) {
                    index = data.findIndex(function (item) { return item.id === editingId; });
                    if (index !== -1) {
                        data[index] = __assign(__assign({}, data[index]), { name: name, fatherName: fatherName, gender: gender, phone: phone, languages: languages, dob: dob, photo: base64Photo || data[index].photo, balance: balance });
                        editingId = null;
                        submitButton.innerText = "Add";
                    }
                }
                else {
                    newData = {
                        id: data.length + 1,
                        name: name,
                        fatherName: fatherName,
                        gender: gender,
                        phone: phone,
                        languages: languages,
                        dob: dob,
                        photo: base64Photo,
                        balance: balance
                    };
                    data.push(newData);
                }
                renderTable();
                form.reset();
                return [2 /*return*/];
        }
    });
}); });
function toBase64(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () { return resolve(reader.result); };
        reader.onerror = function (error) { return reject(error); };
    });
}
function renderTable() {
    tableBody.innerHTML = "";
    data.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = "\n      <td>".concat(item.name, "</td>\n      <td>").concat(item.fatherName, "</td>\n      <td>").concat(item.gender, "</td>\n      <td>").concat(item.phone, "</td>\n      <td>").concat(item.languages.join(", "), "</td>\n      <td>").concat(item.dob, "</td>\n      <td>").concat(item.photo ? "<img src=\"".concat(item.photo, "\" alt=\"Photo\">") : "", "</td>\n      <td>").concat(item.balance.toFixed(2), "</td>\n      <td>\n        <button data-edit=\"").concat(item.id, "\">Edit</button>\n        <button data-delete=\"").concat(item.id, "\">Delete</button>\n      </td>\n    ");
        tableBody.appendChild(row);
    });
    // Bind actions after rendering
    tableBody.querySelectorAll("button[data-edit]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var id = parseInt(btn.dataset.edit);
            edit(id);
        });
    });
    tableBody.querySelectorAll("button[data-delete]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var id = parseInt(btn.dataset.delete);
            remove(id);
        });
    });
}
function edit(id) {
    editingId = id;
    var item = data.find(function (item) { return item.id === id; });
    if (item) {
        nameInput.value = item.name;
        fatherNameInput.value = item.fatherName;
        genderInput.value = item.gender;
        phoneInput.value = item.phone;
        dobInput.value = item.dob;
        balanceInput.value = item.balance.toString();
        Array.from(languagesInput.options).forEach(function (option) {
            option.selected = item.languages.includes(option.value);
        });
        submitButton.innerText = "Update";
    }
}
function remove(id) {
    data = data.filter(function (item) { return item.id !== id; });
    renderTable();
}
