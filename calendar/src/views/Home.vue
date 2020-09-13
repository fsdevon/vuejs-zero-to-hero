<template>
  <div class="home">
    <div class="calendar">
      <header>
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          size="medium"
          @click.prevent="handlePreviousMonth"
        >Previous</el-button>
        <div>
          <span>{{ tempMonth.format('MMMM YYYY') }}</span>
          <i
            v-if="checkResetMonth()"
            class="reset-current-date el-icon-aim"
            @click="resetCurrentMonth"
          ></i>
        </div>
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          size="medium"
          @click.prevent="handleNextMonth"
        >
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
      <ul class="days">
        <li
          v-for="(day, index) in calendar"
          :key="index"
          class="day"
          :class="isOtherMonth(day) ? 'other-month': ''"
          @click="onDateClick(day)"
        >
          <div class="date">
            <span
              class="day-number"
              :class="isCurrentDate(day) ? 'active': isSunday(day) ? 'sunday': ''"
            >{{ day.date() }}</span>
            <span class="day-of-week">{{ day.format('dddd') }}</span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="day-activities">
            <div v-if="checkAttendanceDay(day)" class="cin-cout-time">
              <span>
                <i class="el-icon-sunrise-1" />
                08:15
              </span>
              <span>....</span>
              <span>
                <i class="el-icon-timer" />
                8h
              </span>
              <span>....</span>
              <span>
                <i class="el-icon-moon-night" />
                17:30
              </span>
            </div>
            <div>
              <el-tag effect="dark" size="small">
                Nghi phep
                <i class="el-icon-circle-check" />
              </el-tag>
            </div>
            <div>
              <el-tag type="success" effect="dark" size="small">Metting sprint</el-tag>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as moment from "moment";
import "moment/locale/vi";

@Component({
  components: {}
})
export default class Home extends Vue {
  private currentDate = moment().date();
  private currentMonth = moment().month() + 1;
  private tempMonth = moment();
  private calendar: moment.Moment[] = [];

  created() {
    this.calculateCalendar();
  }

  private calculateCalendar() {
    this.calendar = [];
    const startWeek = this.tempMonth.startOf("month").week();
    for (let week = startWeek; week < startWeek + 6; week++) {
      const days = Array(7)
        .fill(0)
        .map((n, i) =>
          moment()
            .week(week)
            .startOf("week")
            .clone()
            .add(n + i, "day")
        );
      this.calendar = this.calendar.concat(days);
    }
  }

  private checkResetMonth() {
    if (moment().format("YYYY MM") !== this.tempMonth.format("YYYY MM")) {
      return true;
    }
    return false;
  }

  private isOtherMonth(day: moment.Moment) {
    if (day.month() + 1 !== this.tempMonth.month() + 1) {
      return true;
    }
    return false;
  }

  private isCurrentDate(day: moment.Moment) {
    if (
      day.month() + 1 === this.currentMonth &&
      day.date() === this.currentDate
    ) {
      return true;
    }
    return false;
  }

  private isSunday(day: moment.Moment) {
    return day.day() === 0;
  }
  private checkAttendanceDay(day: moment.Moment) {
    if (
      day.month() + 1 === this.currentMonth &&
      day.date() <= this.currentDate
    ) {
      return true;
    }
    return false;
  }

  private handleNextMonth() {
    this.tempMonth = this.tempMonth.add(1, "M");
    this.calculateCalendar();
  }

  private handlePreviousMonth() {
    this.tempMonth = this.tempMonth.add(-1, "M");
    this.calculateCalendar();
  }

  private onDateClick(day: moment.Moment) {
    console.log(day.format("LLLL"));
  }

  private resetCurrentMonth() {
    this.tempMonth = moment();
    this.calculateCalendar();
  }
}
</script>

<style scoped lang="scss">
.calendar {
  width: 100%;

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
    font-size: 18px;
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
  background: #f5f5f5;
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
