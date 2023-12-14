"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crop = void 0;
const typeorm_1 = require("typeorm");
let Crop = class Crop {
};
exports.Crop = Crop;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Crop.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Crop.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crop.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crop.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Crop.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crop.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crop.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crop.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Crop.prototype, "recommendedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Crop.prototype, "quality", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Crop.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Crop.prototype, "moisture", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Crop.prototype, "approved", void 0);
exports.Crop = Crop = __decorate([
    (0, typeorm_1.Entity)()
], Crop);
