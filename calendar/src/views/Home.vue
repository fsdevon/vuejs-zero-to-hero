<template>
  <div class="home">
    <div class="calendar">
      <header>
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          size="small"
          @click.prevent="handlePreviousMonth"
          >Previous</el-button
        >
        <div>
          <span>{{ tempCurrentMoment.format("MMMM YYYY") }}</span>
          <el-tooltip
            class="item"
            effect="dark"
            content="Go to current month"
            placement="right"
            v-if="checkResetMonth()"
          >
            <i
              class="reset-current-date el-icon-aim"
              @click="resetCurrentMonth"
            />
          </el-tooltip>
        </div>
        <el-button type="primary" size="small" @click.prevent="handleNextMonth">
          Next
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </header>
      <ul class="weekdays">
        <li>Thứ 2</li>
        <li>Thứ 3</li>
        <li>Thứ 4</li>
        <li>Thứ 5</li>
        <li>Thứ 6</li>
        <li>Thứ 7</li>
        <li>Chủ nhật</li>
      </ul>
      <ul class="days" :key="updateCalendar">
        <li
          v-for="day in calendar"
          :key="day.id"
          class="day"
          :class="isOtherMonth(day.moment) ? 'other-month' : ''"
          @click="onDateClick(day)"
        >
          <div class="date">
            <span
              class="day-number"
              :class="
                isCurrentDate(day.moment)
                  ? 'active'
                  : isSunday(day.moment)
                  ? 'sunday'
                  : ''
              "
              >{{ day.moment.date() }}</span
            >
            <span class="day-of-week">{{ day.moment.format("dddd") }}</span>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus" command="a"
                  >Thêm ngày nghỉ</el-dropdown-item
                >
                <el-dropdown-item>Ngày nghỉ</el-dropdown-item>
                <el-dropdown-item>Lịch họp</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided icon="el-icon-money"
                  >5.000 VND (phạt)</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="day-activities">
            <div v-if="checkAttendanceDay(day.moment)" class="cin-cout-time">
              <span>
                <i class="el-icon-sunrise-1" />
                {{ day.checkInTime.format("HH:mm") }}
              </span>
              <span>
                <i class="el-icon-timer" />
                {{ getWorkTimeHour(day.checkInTime, day.checkOutTime) }}
              </span>
              <span>
                <i class="el-icon-moon-night" />
                {{ day.checkOutTime.format("HH:mm") }}
              </span>
            </div>
            <div>
              <i class="el-icon-alarm-clock" />
              <el-tag effect="dark" size="mini">
                Nghi phep
                <i class="el-icon-circle-check" />
              </el-tag>
            </div>
            <div>
              <i class="el-icon-time" />
              <span>09:30 - 10:30</span>
              <el-tag type="warning" effect="dark" size="mini"
                >Metting sprint</el-tag
              >
            </div>
            <div>
              <i class="el-icon-money" />
              <span>5.000 VND</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import "moment/locale/vi";

interface CheckInOutCalendar {
  id: number;
  checkInTime?: moment.Moment;
  checkOutTime?: moment.Moment;
  moment: moment.Moment;
}

@Component({
  components: {}
})
export default class Home extends Vue {
  private currentMoment = moment();
  private currentMonth = moment().month() + 1;
  private tempCurrentMoment = moment();
  private calendar: CheckInOutCalendar[] = [];
  private updateCalendar = 0;

  created() {
    this.calculateCalendar();
  }

  private handleCommand(command: any) {
    this.$message("click on item " + command);
  }

  private calculateCalendar() {
    this.calendar = [];
    const startWeek = this.tempCurrentMoment.startOf("month").week();
    let id = 0;
    for (let week = startWeek; week < startWeek + 6; week++) {
      const days = Array(7)
        .fill(0)
        .map((n, i) => {
          const day = moment()
            .week(week)
            .startOf("week")
            .clone()
            .add(n + i, "day");
          id++;
          return {
            id,
            checkInTime: day.clone().set({ hour: 0, minute: 0 }),
            checkOutTime: day.clone().set({ hour: 17, minute: 0 }),
            moment: day
          };
        });
      this.calendar = this.calendar.concat(days);
    }
  }

  private getWorkTimeHour(
    checkInTime?: moment.Moment,
    checkOutTime?: moment.Moment
  ) {
    if (checkInTime && checkOutTime) {
      const duration = moment.duration(checkOutTime.diff(checkInTime));
      return Math.max(duration.asHours() - 1.25, 0).toFixed(2) + "h"; //hours instead of asHours
    }
    return "";
  }

  private checkResetMonth() {
    if (
      this.currentMoment.format("YYYY MM") !==
      this.tempCurrentMoment.format("YYYY MM")
    ) {
      return true;
    }
    return false;
  }

  private isOtherMonth(day: moment.Moment) {
    if (day.month() !== this.tempCurrentMoment.month()) {
      return true;
    }
    return false;
  }

  private isCurrentDate(day: moment.Moment) {
    if (day.format("YYYY MM DD") === this.currentMoment.format("YYYY MM DD")) {
      return true;
    }
    return false;
  }

  private isSunday(day: moment.Moment) {
    return day.day() === 0;
  }

  private checkAttendanceDay(day: moment.Moment) {
    if (
      day <= this.currentMoment &&
      day >= this.currentMoment.clone().startOf("month")
    ) {
      return true;
    }
    return false;
  }

  private handleNextMonth() {
    this.tempCurrentMoment.add(1, "M");
    this.calculateCalendar();
  }

  private handlePreviousMonth() {
    this.tempCurrentMoment.add(-1, "M");
    this.calculateCalendar();
  }

  private onDateClick(day: CheckInOutCalendar) {
    this.calendar[day.id - 1].checkInTime = moment();
    //this.updateCalendar++;
  }

  private resetCurrentMonth() {
    this.tempCurrentMoment = moment();
    this.calculateCalendar();
  }
}
</script>

<style scoped lang="scss">
.calendar {
  width: 100%;
  font-size: 14px;

  header {
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    div {
      display: flex;
      align-items: center;

      i {
        font-size: 1.5em;
      }
    }

    span {
      font-weight: bold;
      font-size: 25px;
      text-transform: capitalize;
    }

    h1 {
      margin: 0;
    }

    .reset-current-date {
      color: red;
      cursor: pointer;
      margin-left: 10px;
    }
  }
}

.calendar ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.calendar li {
  display: block;
  float: left;
  width: 14.342%;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  margin-right: -1px;
  margin-bottom: -1px;
}
.calendar ul.weekdays {
  height: 40px;
  background: #343a40;

  li {
    text-align: center;
    text-transform: uppercase;
    line-height: 20px;
    border: none !important;
    padding: 10px 6px;
    color: #fff;
    font-weight: 600;
  }
}

.calendar .days li {
  height: 120px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background: #d3d3d3;
  }
}

.calendar .date {
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 2px;

  .day-number {
    font-size: 1rem;
    font-weight: 700;

    &.active {
      padding: 0 4px;
      border-radius: 0.125rem;
      background: red;
      color: #fff;
    }

    &.sunday {
      color: red;
    }
  }

  .day-of-week {
    display: none;
  }
}

.calendar .other-month {
  background-color: #f5f5f5 !important;
  color: #666;
}

.calendar .cin-cout-time {
  display: flex;
  justify-content: space-between;
}

.calendar .day-activities {
  margin: 5px 10px;

  * {
    margin-bottom: 2px;
  }
}

.el-icon-more {
  font-size: 20px;
}

@media (max-width: 768px) {
  .calendar {
    .weekdays,
    .other-month {
      display: none;
    }

    li {
      height: auto !important;
      border: 1px solid #ededed;
      width: 100%;
      padding: 10px;
      margin-bottom: -1px;
    }

    .date {
      float: none;

      .day-of-week {
        display: block;
        text-transform: capitalize;
      }
    }
  }
}
</style>
