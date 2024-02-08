import { Observable } from "rxjs";
import { ListElement } from "src/app/shared/models/list/list-element";

export abstract class AbstractRandomElementModalComponent {

    randomElement$!: Observable<ListElement>;

    protected abstract getRandomElement(): Observable<ListElement>;

    public generateNewRandomElement(): void {

        this.randomElement$ = this.getRandomElement();

    }

}