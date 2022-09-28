import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { PhaseService } from "../services/phase.service";
import { PhaseDoneEvent } from "../events/phase-done.event";

@Injectable()
export class PhaseDoneListener {
  constructor(private readonly phaseService: PhaseService) {}

  @OnEvent("phase.done")
  async handlePhaseDoneEvent(data: PhaseDoneEvent): Promise<void> {
    await this.phaseService.setPhaseDone(data.id);
  }
}
