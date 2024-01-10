import { z } from "zod";
import { location, localizedText, viewport } from "./places";

export const polyline = z.object({ encodedPolyline: z.string() });

export const maneuver = z.enum([
  "MANEUVER_UNSPECIFIED",
  "TURN_SLIGHT_LEFT",
  "TURN_SHARP_LEFT",
  "UTURN_LEFT",
  "TURN_LEFT",
  "TURN_SLIGHT_RIGHT",
  "TURN_SHARP_RIGHT",
  "UTURN_RIGHT",
  "TURN_RIGHT",
  "STRAIGHT",
  "RAMP_LEFT",
  "RAMP_RIGHT",
  "MERGE",
  "FORK_LEFT",
  "FORK_RIGHT",
  "FERRY",
  "FERRY_TRAIN",
  "ROUNDABOUT_LEFT",
  "ROUNDABOUT_RIGHT",
  "DEPART",
  "NAME_CHANGE",
]);

export const navigationInstruction = z.object({
  maneuver,
  instructions: z.string(),
});

export const speed = z.enum([
  "SPEED_UNSPECIFIED",
  "NORMAL",
  "SLOW",
  "TRAFFIC_JAM",
]);

export const speedReadingInterval = z.object({
  startPolylinePointIndex: z.number(),
  endPolylinePointIndex: z.number(),
  speed,
});

export const routeLegStepTravelAdvisory = z.object({
  speedReadingIntervals: z.array(speedReadingInterval),
});

export const routeLegStepLocalizedValues = z.object({
  distance: localizedText,
  staticDuration: localizedText,
});

export const transitStop = z.object({
  name: z.string(),
  location: location,
});

export const transitStopDetails = z.object({
  arrivalStop: transitStop,
  arrivalTime: z.string(),
  departureStop: transitStop,
  departureTime: z.string(),
});

export const localizedTime = z.object({
  time: localizedText,
  timeZone: z.string(),
});

export const transitDetailsLocalizedValues = z.object({
  arrivalTime: localizedTime,
  departureTime: localizedTime,
});

export const transitAgency = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  uri: z.string(),
});

export const transitVehicleType = z.enum([
  "TRANSIT_VEHICLE_TYPE_UNSPECIFIED",
  "BUS",
  "CABLE_CAR",
  "COMMUTER_TRAIN",
  "FERRY",
  "FUNICULAR",
  "GONDOLA_LIFT",
  "HEAVY_RAIL",
  "HIGH_SPEED_TRAIN",
  "INTERCITY_BUS",
  "LONG_DISTANCE_TRAIN",
  "METRO_RAIL",
  "MONORAIL",
  "OTHER",
  "RAIL",
  "SHARE_TAXI",
  "SUBWAY",
  "TRAM",
  "TROLLEYBUS",
]);

export const transitVehicle = z.object({
  name: localizedText,
  type: transitVehicleType,
  iconUri: z.string(),
  localIconUri: z.string(),
});

export const transitLine = z.object({
  agencies: z.array(transitAgency),
  name: z.string(),
  uri: z.string(),
  color: z.string(),
  iconUri: z.string(),
  nameShort: z.string(),
  textColor: z.string(),
  vehicle: transitVehicle,
});

export const routeLegStepTransitDetails = z.object({
  stopDetails: transitStopDetails,
  localizedValues: transitDetailsLocalizedValues,
  headsign: z.string(),
  headway: z.string(),
  transitLine,
  stopCount: z.number(),
  tripShortText: z.string(),
});

export const routeTravelMode = z.enum([
  "TRAVEL_MODE_UNSPECIFIED",
  "DRIVE",
  "BICYCLE",
  "WALK",
  "TWO_WHEELER",
  "TRANSIT",
]);

export const routeLegStep = z.object({
  distanceMeters: z.number(),
  staticDuration: z.string(),
  polyline,
  startLocation: location,
  endLocation: location,
  navigationInstruction,
  travelAdvisory: routeLegStepTravelAdvisory,
  localizedValues: routeLegStepLocalizedValues,
  transitDetails: routeLegStepTransitDetails,
  travelMode: routeTravelMode,
});

export const routeLabel = z.enum([
  "ROUTE_LABEL_UNSPECIFIED",
  "DEFAULT_ROUTE",
  "DEFAULT_ROUTE_ALTERNATE",
  "FUEL_EFFICIENT",
]);

export const money = z.object({
  currencyCode: z.string(),
  units: z.string(),
  nanos: z.number(),
});

export const tollInfo = z.object({
  estimatedPrice: z.array(money),
});

export const routeLegTravelAdvisory = z.object({
  tollInfo,
  speedReadingIntervals: z.array(speedReadingInterval),
});

export const routeLegLocalizedValues = z.object({
  distance: localizedText,
  duration: localizedText,
  staticDuration: localizedText,
});

export const multiModalSegment = z.object({
  navigationInstruction: navigationInstruction,
  travelMode: routeTravelMode,
  stepStartIndex: z.number(),
  stepEndIndex: z.number(),
});

export const stepsOverview = z.object({
  multiModalSegments: z.array(multiModalSegment),
});

export const routeLeg = z.object({
  distanceMeters: z.number(),
  duration: z.string(),
  staticDuration: z.string(),
  polyline,
  startLocation: location,
  endLocation: location,
  steps: z.array(routeLegStep),
  travelAdvisory: routeLegTravelAdvisory,
  localizedValues: routeLegLocalizedValues,
  stepsOverview,
});

export const routeTravelAdvisory = z.object({
  tollInfo,
  speedReadingIntervals: z.array(speedReadingInterval),
  fuelConsumptionMicroliters: z.string(),
  routeRestrictionsPartiallyIgnored: z.boolean(),
  transitFare: money,
});

export const routeLocalizedValues = z.object({
  distance: localizedText,
  duration: localizedText,
  staticDuration: localizedText,
  transitFare: localizedText,
});

export const route = z.object({
  routeLabels: z.array(routeLabel).optional(),
  legs: z.array(routeLeg).optional(),
  distanceMeters: z.number(),
  duration: z.string(),
  staticDuration: z.string().optional(),
  polyline,
  description: z.string().optional(),
  warnings: z.array(z.string()).optional(),
  viewport: viewport.optional(),
  travelAdvisory: routeTravelAdvisory.optional(),
  optimizedIntermediateWaypointIndex: z.array(z.string()).optional(),
  localizedValues: routeLocalizedValues.optional(),
  routeToken: z.string().optional(),
});

export const fallbackRoutingMode = z.enum([
  "FALLBACK_ROUTING_MODE_UNSPECIFIED",
  "FALLBACK_TRAFFIC_UNAWARE",
  "FALLBACK_TRAFFIC_AWARE",
]);

export const fallbackReason = z.enum([
  "FALLBACK_REASON_UNSPECIFIED",
  "SERVER_ERROR",
  "LATENCY_EXCEEDED",
]);

export const fallbackInfo = z.object({
  routingMode: fallbackRoutingMode,
  reason: fallbackReason,
});

export const status = z.object({
  code: z.number(),
  message: z.string(),
  details: z.array(z.any()),
});

export const geocodedWaypoint = z.object({
  geocoderStatus: status,
  type: z.array(z.string()),
  partialMatch: z.boolean(),
  placeId: z.string(),
  intermediateWaypointRequestIndex: z.number(),
});

export const geocodingResults = z.object({
  origin: geocodedWaypoint,
  destination: geocodedWaypoint,
  intermediates: z.array(geocodedWaypoint),
});

export const computeRoutesResponse = z.object({
  routes: z.array(route),
  fallbackInfo: fallbackInfo.optional(),
  geocodingResults: geocodingResults.optional(),
});
