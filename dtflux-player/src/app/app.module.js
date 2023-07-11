"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const column_component_1 = require("./displays/column/column.component");
const control_center_component_1 = require("./displays/control-center/control-center.component");
const iso_component_1 = require("./components/iso/iso.component");
const classement_component_1 = require("./components/classement/classement.component");
const info_etape_component_1 = require("./displays/info-etape/info-etape.component");
const start_component_1 = require("./displays/start/start.component");
const arch_finish1_component_1 = require("./displays/arch-finish1/arch-finish1.component");
const arch_finish2_component_1 = require("./displays/arch-finish2/arch-finish2.component");
const arch_finish3_component_1 = require("./displays/arch-finish3/arch-finish3.component");
const arch_finish4_component_1 = require("./displays/arch-finish4/arch-finish4.component");
const arch_spotter4_component_1 = require("./displays/arch-spotter4/arch-spotter4.component");
const arch_spotter3_component_1 = require("./displays/arch-spotter3/arch-spotter3.component");
const arch_spotter2_component_1 = require("./displays/arch-spotter2/arch-spotter2.component");
const arch_spotter1_component_1 = require("./displays/arch-spotter1/arch-spotter1.component");
const mocking_service_1 = require("./services/mocking.service");
let AppModule = exports.AppModule = (() => {
    let _classDecorators = [(0, core_1.NgModule)({
            declarations: [
                app_component_1.AppComponent,
                column_component_1.ColumnComponent,
                control_center_component_1.ControlCenterComponent,
                iso_component_1.IsoComponent,
                classement_component_1.ClassementComponent,
                info_etape_component_1.InfoEtapeComponent,
                start_component_1.StartComponent,
                arch_finish1_component_1.ArchFinish1Component,
                arch_finish2_component_1.ArchFinish2Component,
                arch_finish3_component_1.ArchFinish3Component,
                arch_finish4_component_1.ArchFinish4Component,
                arch_spotter4_component_1.ArchSpotter4Component,
                arch_spotter3_component_1.ArchSpotter3Component,
                arch_spotter2_component_1.ArchSpotter2Component,
                arch_spotter1_component_1.ArchSpotter1Component,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
            ],
            providers: [mocking_service_1.MockingService,],
            bootstrap: [app_component_1.AppComponent]
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AppModule = class {
        static {
            __esDecorate(null, _classDescriptor = { value: this }, _classDecorators, { kind: "class", name: this.name }, null, _classExtraInitializers);
            AppModule = _classThis = _classDescriptor.value;
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return AppModule = _classThis;
})();
